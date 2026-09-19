<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { AdvicerForm } from "@/types/advicerTypes";
import { useAdvicerStore } from "~/stores/advicer";
import {
  genders,
  goals,
  healthIssues,
  sleepQualities,
  stressLevels,
} from "~/utils/advicerOptions";

const advicerStore = useAdvicerStore();
const route = useRoute();

const steps = [
  { step: 1, title: "Basic info", fields: ["age", "gender"] },
  { step: 2, title: "Health goals", fields: ["goals", "healthIssues"] },
  { step: 3, title: "Lifestyle", fields: ["sleepQuality", "stressLevel"] },
  { step: 4, title: "Your protocol", fields: [] },
] as const;

const pick = "Pick one option";

const { values, validateField, setFieldValue } = useForm<AdvicerForm>({
  // Les champs des étapes précédentes sont démontés : sans cela, vee-validate
  // effacerait leurs réponses et l'API ne recevrait que la dernière étape
  keepValuesOnUnmount: true,
  validationSchema: toTypedSchema(
    z.object({
      age: z
        .number({ required_error: "Enter your age", invalid_type_error: "Enter your age" })
        .int()
        .min(1, "Enter an age between 1 and 120")
        .max(120, "Enter an age between 1 and 120"),
      gender: z.string({ required_error: pick }).min(1, pick),
      goals: z.array(z.string()).min(1, "Pick at least one goal"),
      healthIssues: z.array(z.string()).default([]),
      sleepQuality: z.string({ required_error: pick }).min(1, pick),
      stressLevel: z.string({ required_error: pick }).min(1, pick),
    })
  ),
  initialValues: {
    // Un objectif choisi depuis l'accueil (?goal=…) arrive déjà coché
    goals: goals.some((goal) => goal.id === route.query.goal)
      ? [String(route.query.goal)]
      : [],
    healthIssues: [],
  },
});

const step = ref(1);
const error = ref<string | null>(null);

const labelOf = (list: { id: string; label: string }[], id?: string) =>
  list.find((item) => item.id === id)?.label ?? "";

// Résumé affiché sous chaque étape terminée du Stepper
const summaries = computed<Record<number, string>>(() => ({
  1: values.age && values.gender ? `${labelOf(genders, values.gender)}, ${values.age}` : "",
  2: values.goals?.length ? `${values.goals.length} goal${values.goals.length > 1 ? "s" : ""}` : "",
  3: values.sleepQuality && values.stressLevel
    ? `${labelOf(sleepQualities, values.sleepQuality)} sleep`
    : "",
}));

// « Aucun » exclut les autres réponses, et inversement
const updateIssues = (next: string[]) => {
  const added = next.find((id) => !values.healthIssues?.includes(id));
  setFieldValue(
    "healthIssues",
    added === "none" ? ["none"] : next.filter((id) => id !== "none")
  );
};

const stepIsValid = async () => {
  const fields = steps[step.value - 1].fields;
  const results = await Promise.all(fields.map((field) => validateField(field)));
  return results.every((result) => result.valid);
};

const submit = async () => {
  error.value = null;
  try {
    await advicerStore.getSupplementRecommendations({ ...values } as AdvicerForm);
    step.value = 4;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    error.value = "The advisor didn’t answer. Please try again in a moment.";
  }
};

const next = async () => {
  if (!(await stepIsValid())) return;
  if (step.value === 3) {
    await submit();
  } else {
    step.value += 1;
  }
};

const back = () => {
  error.value = null;
  step.value = Math.max(1, step.value - 1);
};

const restart = () => {
  step.value = 1;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <!-- Résultats -->
  <ViewsSupplementAdvicerResults
    v-if="step === 4 && advicerStore.supplementRecommendations"
    :result="advicerStore.supplementRecommendations"
    :form="values as AdvicerForm"
    @edit="restart"
  />

  <!-- Questionnaire -->
  <div
    v-else
    class="container grid gap-10 pb-24 pt-10 md:pt-16 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20"
  >
    <aside class="flex flex-col gap-8 lg:gap-10">
      <div class="flex flex-col gap-3.5">
        <p class="kicker">Analysis</p>
        <h1 class="text-4xl md:text-[44px] md:leading-[1.05]">Let’s build your protocol.</h1>
      </div>

      <Stepper
        v-model="step"
        orientation="vertical"
        linear
        class="hidden flex-col lg:flex"
      >
        <StepperItem
          v-for="item in steps"
          :key="item.step"
          :step="item.step"
          :disabled="item.step > step || advicerStore.formLoading"
          class="w-full border-t py-2 last:border-b"
        >
          <StepperTrigger class="w-full flex-row items-center gap-4 px-0 py-2.5 text-left">
            <StepperIndicator
              class="h-8 w-8 shrink-0 border font-mono text-[13px] text-muted-foreground group-data-[state=active]:border-2 group-data-[state=active]:border-primary group-data-[state=active]:bg-transparent group-data-[state=active]:text-primary group-data-[state=completed]:border-foreground group-data-[state=completed]:bg-foreground group-data-[state=completed]:text-background"
            >
              <LucideCheck v-if="item.step < step" class="h-4 w-4" />
              <template v-else>0{{ item.step }}</template>
            </StepperIndicator>
            <div class="flex flex-1 items-center justify-between gap-3">
              <StepperTitle
                class="text-[17px] font-normal group-data-[state=active]:font-semibold group-data-[state=inactive]:text-muted-foreground"
              >
                {{ item.title }}
              </StepperTitle>
              <StepperDescription v-if="item.step < step" class="font-mono">
                {{ summaries[item.step] }}
              </StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </Stepper>

      <p class="hidden text-sm leading-relaxed text-muted-foreground lg:block">
        Your answers are only used to generate this protocol. Nothing is stored.
      </p>
    </aside>

    <Card class="rounded-[20px] shadow-none">
      <form class="flex h-full flex-col gap-10 p-6 md:p-12" novalidate @submit.prevent="next">
        <CardHeader class="gap-3 p-0">
          <p class="font-mono text-xs tracking-[0.08em] text-muted-foreground md:text-[13px]">
            STEP {{ step }} OF 4
          </p>
          <template v-if="step === 1">
            <CardTitle class="font-display text-3xl font-medium tracking-tight md:text-[40px] md:leading-tight">
              First, a little about you.
            </CardTitle>
            <CardDescription class="text-base md:text-[17px]">Doses depend on both.</CardDescription>
          </template>
          <template v-else-if="step === 2">
            <CardTitle class="font-display text-3xl font-medium tracking-tight md:text-[40px] md:leading-tight">
              What do you want to improve?
            </CardTitle>
            <CardDescription class="text-base md:text-[17px]">
              Choose as many as apply.
              <span class="font-mono text-[13px] text-primary">{{ values.goals?.length ?? 0 }} SELECTED</span>
            </CardDescription>
          </template>
          <template v-else>
            <CardTitle class="font-display text-3xl font-medium tracking-tight md:text-[40px] md:leading-tight">
              How are your nights and days?
            </CardTitle>
            <CardDescription class="text-base md:text-[17px]">
              An honest answer gives a better protocol.
            </CardDescription>
          </template>
        </CardHeader>

        <!-- Étape 1 -->
        <CardContent v-if="step === 1" class="flex flex-col gap-8 p-0">
          <FormField v-slot="{ value, handleChange }" name="age">
            <FormItem class="space-y-3">
              <FormLabel class="font-display text-2xl font-normal">Age</FormLabel>
              <NumberField :model-value="value" :min="1" :max="120" class="w-44" @update:model-value="handleChange">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput class="h-12 font-mono text-lg" placeholder="34" />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="gender">
            <FormItem class="space-y-3">
              <FormLabel class="font-display text-2xl font-normal">Sex</FormLabel>
              <FormControl>
                <RadioGroup v-bind="componentField" class="flex flex-wrap gap-2.5">
                  <Label
                    v-for="option in genders"
                    :key="option.id"
                    class="flex h-12 cursor-pointer items-center gap-3 rounded-md border px-4 text-[15px] font-normal transition-colors hover:border-foreground has-[[data-state=checked]]:border-foreground has-[[data-state=checked]]:bg-background"
                  >
                    <RadioGroupItem :value="option.id" />
                    {{ option.label }}
                  </Label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>

        <!-- Étape 2 -->
        <CardContent v-else-if="step === 2" class="flex flex-col gap-10 p-0">
          <FormField v-slot="{ value, handleChange }" name="goals">
            <FormItem class="space-y-3">
              <FormLabel class="sr-only">Health goals</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  :model-value="value"
                  class="grid grid-cols-2 gap-3 lg:grid-cols-4"
                  @update:model-value="handleChange"
                >
                  <ToggleGroupItem
                    v-for="goal in goals"
                    :key="goal.id"
                    :value="goal.id"
                    class="group/goal h-auto min-h-[112px] flex-col items-start justify-between gap-3 whitespace-normal rounded-[14px] border bg-white p-4 text-left hover:border-foreground hover:bg-white hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground dark:bg-background md:p-[18px]"
                  >
                    <span class="flex w-full items-center justify-between gap-2 text-base font-semibold">
                      {{ goal.label }}
                      <LucideCheck class="hidden group-data-[state=on]/goal:block" />
                    </span>
                    <span class="text-[13px] font-normal leading-snug text-muted-foreground group-data-[state=on]/goal:text-primary-foreground">
                      {{ goal.hint }}
                    </span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value }" name="healthIssues">
            <FormItem class="space-y-4">
              <FormLabel class="flex items-baseline gap-3">
                <span class="font-display text-2xl font-normal">Anything we should know?</span>
                <Badge variant="outline" class="font-mono font-normal">OPTIONAL</Badge>
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  :model-value="value"
                  class="flex flex-wrap justify-start gap-2.5"
                  @update:model-value="updateIssues"
                >
                  <ToggleGroupItem
                    v-for="issue in healthIssues"
                    :key="issue.id"
                    :value="issue.id"
                    variant="outline"
                    class="h-11 px-4 text-[15px] font-normal shadow-none data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:hover:bg-foreground data-[state=on]:hover:text-background"
                  >
                    {{ issue.label }}
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          </FormField>
        </CardContent>

        <!-- Étape 3 -->
        <CardContent v-else class="flex flex-col gap-10 p-0">
          <FormField
            v-for="field in [
              { name: 'sleepQuality', label: 'Sleep quality', options: sleepQualities },
              { name: 'stressLevel', label: 'Stress level', options: stressLevels },
            ]"
            :key="field.name"
            v-slot="{ componentField }"
            :name="field.name"
          >
            <FormItem class="space-y-4">
              <FormLabel class="font-display text-2xl font-normal">{{ field.label }}</FormLabel>
              <FormControl>
                <RadioGroup v-bind="componentField" class="flex flex-wrap gap-2.5">
                  <Label
                    v-for="option in field.options"
                    :key="option.id"
                    class="flex h-12 cursor-pointer items-center gap-3 rounded-md border px-4 text-[15px] font-normal transition-colors hover:border-foreground has-[[data-state=checked]]:border-foreground has-[[data-state=checked]]:bg-background"
                  >
                    <RadioGroupItem :value="option.id" />
                    {{ option.label }}
                  </Label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>

        <Alert v-if="error" variant="destructive">
          <LucideCircleAlert class="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <CardFooter class="mt-auto gap-4 border-t p-0 pt-7 md:gap-6">
          <Button
            v-if="step > 1"
            type="button"
            variant="outline"
            size="lg"
            class="border-foreground"
            :disabled="advicerStore.formLoading"
            @click="back"
          >
            Back
          </Button>
          <Progress :model-value="(step / 4) * 100" class="h-1 flex-1 bg-rule" :aria-label="`Step ${step} of 4`" />
          <Button type="submit" size="lg" :disabled="advicerStore.formLoading">
            <template v-if="advicerStore.formLoading">
              <LucideLoaderCircle class="animate-spin" />
              Thinking…
            </template>
            <template v-else-if="step === 3">
              Get my protocol
              <LucideArrowRight />
            </template>
            <template v-else>
              Continue
              <LucideArrowRight />
            </template>
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
