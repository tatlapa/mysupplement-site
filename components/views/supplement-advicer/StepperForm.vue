<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { h, ref } from "vue";
import * as z from "zod";
import type {
  AdvicerForm,
  SupplementRecommendation,
} from "@/types/advicerTypes";
import { useAdvicerStore } from "~/stores/advicer";

const advicerStore = useAdvicerStore();

const goals = [
  { id: "energy_focus", label: "Energy & Focus" },
  { id: "sleep_improvement", label: "Sleep Improvement" },
  { id: "stress_management", label: "Stress Management" },
  { id: "physical_performance", label: "Physical Performance" },
  { id: "mental_clarity", label: "Mental Clarity" },
  { id: "immune_support", label: "Immune Support" },
  { id: "anti_aging", label: "Anti-aging" },
  { id: "weight_management", label: "Weight Management" },
];

const healthIssues = [
  { id: "anxiety", label: "Anxiety" },
  { id: "depression", label: "Depression" },
  { id: "insomnia", label: "Insomnia" },
  { id: "joint_pain", label: "Joint Pain" },
  { id: "digestive_issues", label: "Digestive Issues" },
  { id: "high_blood_pressure", label: "High Blood Pressure" },
  { id: "diabetes", label: "Diabetes" },
  { id: "none", label: "None" },
];

const formSchema = [
  z.object({
    age: z.number().min(1).max(120),
    gender: z.string(),
  }),
  z.object({
    goals: z.array(z.string()).min(1, "Select at least one goal"),
    healthIssues: z.array(z.string()).optional().default([]),
  }),
  z.object({
    sleepQuality: z.string(),
    stressLevel: z.string(),
  }),
];

const stepIndex = ref(1);

const steps = [
  {
    step: 1,
    title: "Basic Info",
  },
  {
    step: 2,
    title: "Health Goals",
  },
  {
    step: 3,
    title: "Lifestyle",
  },
  {
    step: 4,
    title: "Results",
  },
];

const resultData = ref<SupplementRecommendation | null>(null);

async function onSubmitAndNext(values: AdvicerForm) {
  advicerStore.formLoading = true; // Active le loader

  try {
    resultData.value = await advicerStore.getSupplementRecommendations(values);
    stepIndex.value = 4; // 🔥 Passe à l'étape 4 seulement après la fin de la requête
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  } finally {
    advicerStore.formLoading = false; // Désactive le loader
  }
}
</script>

<template>
  <div class="w-full md:w-2/3">
    <Form
      v-slot="{ meta, values, validate }"
      as=""
      keep-values
      :validation-schema="
        stepIndex <= 3 ? toTypedSchema(formSchema[stepIndex - 1]) : undefined
      "
    >
      <Stepper
        v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
        v-model="stepIndex"
        class="block w-full"
      >
        <form
          @submit="
            (e) => {
              e.preventDefault();
              validate();
            }
          "
          class="flex flex-col gap-12 mb-12"
        >
          <div class="flex w-full flex-start gap-2">
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              class="relative flex w-full flex-col items-center justify-center"
              :step="step.step"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />

              <StepperTrigger as-child>
                <Button
                  :variant="
                    state === 'completed' || state === 'active'
                      ? 'default'
                      : 'outline'
                  "
                  size="icon"
                  class="z-10 rounded-full shrink-0"
                  :class="[
                    state === 'active' &&
                      'ring-2 ring-ring ring-offset-2 ring-offset-background',
                  ]"
                  :disabled="state !== 'completed' && !meta.valid"
                >
                  <LucideCheck v-if="state === 'completed'" class="size-5" />
                  <LucideCircle v-if="state === 'active'" />
                  <LucideDot v-if="state === 'inactive'" />
                </Button>
              </StepperTrigger>

              <div class="mt-5 flex flex-col items-center text-center">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step.title }}
                </StepperTitle>
              </div>
            </StepperItem>
          </div>

          <div class="rounded-lg p-4 shadow-lg">
            <div class="flex flex-col gap-4 mt-4">
              <template v-if="stepIndex === 1">
                <FormField v-slot="{ componentField }" name="age">
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Select type="number" v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an age" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Age</SelectLabel>
                            <SelectItem
                              v-for="age in 120"
                              :key="age"
                              :value="age"
                            >
                              {{ age }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="gender">
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select type="text" v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="male"> Male </SelectItem>
                            <SelectItem value="female"> Female </SelectItem>
                            <SelectItem value="other"> Other </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 2" >
                <FormField v-slot="{ value = [], handleChange }" name="goals" >
                  <FormItem class="text-left">
                    <FormLabel>Health Goals</FormLabel>
                    <FormDescription>Select at least one goal</FormDescription>
                    <FormControl>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-1 items-center">
                        <div
                          v-for="goal in goals"
                          :key="goal.id"
                          class="flex items-center gap-2"
                        >
                          <Checkbox
                            :model-value="value.includes(goal.id)"
                            @update:model-value="
                              (checked) => {
                                const updatedGoals = checked
                                  ? [...value, goal.id]
                                  : value.filter((g: string) => g !== goal.id);

                                handleChange(updatedGoals); // 🔥 Met à jour Vee-Validate
                              }
                            "
                          />
                          <label>{{ goal.label }}</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField
                  v-slot="{ value = [], handleChange }"
                  name="healthIssues"
                >
                  <FormItem class="text-left">
                    <FormLabel>Health Issues</FormLabel>
                    <FormDescription>Select issue - optional</FormDescription>
                    <FormControl>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-1 items-center">
                        <div
                          v-for="healthIssue in healthIssues"
                          :key="healthIssue.id"
                          class="flex items-center gap-2"
                        >
                          <Checkbox
                            :model-value="value.includes(healthIssue.id)"
                            @update:model-value="
                              (checked) => {
                                const updatedHealthIssues = checked
                                  ? [...value, healthIssue.id]
                                  : value.filter((i: string) => i !== healthIssue.id);

                                handleChange(updatedHealthIssues); // 🔥 Met à jour Vee-Validate
                              }
                            "
                          />
                          <label>{{ healthIssue.label }}</label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 3">
                <FormField v-slot="{ componentField }" name="sleepQuality">
                  <FormItem>
                    <FormLabel>Sleep Quality </FormLabel>
                    <Select v-bind="componentField">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sleep quality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sleep Quality </SelectLabel>
                          <SelectItem value="excellent"> Excellent </SelectItem>
                          <SelectItem value="good"> Good </SelectItem>
                          <SelectItem value="fair"> Fair </SelectItem>
                          <SelectItem value="poor"> Poor </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="stressLevel">
                  <FormItem>
                    <FormLabel>Stress Level </FormLabel>
                    <FormControl>
                      <Select type="text" v-bind="componentField">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a stress level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Stress Level </SelectLabel>
                            <SelectItem value="low"> Low </SelectItem>
                            <SelectItem value="moderate"> Moderate </SelectItem>
                            <SelectItem value="high"> High </SelectItem>
                            <SelectItem value="severe"> Severe </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 4 && resultData">
                <div class="p-6 bg-gray-100 rounded-lg shadow-md">
                  <h2 class="text-lg font-bold mb-4">
                    Your Supplement Recommendations
                  </h2>

                  <ul class="grid grid-cols-2 gap-4">
                    <li
                      v-for="(supplement, index) in resultData.supplements"
                      :key="index"
                      class="p-4 bg-white rounded-md shadow"
                    >
                      <h3 class="text-md font-semibold text-primary">
                        {{ supplement.name }}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {{ supplement.description }}
                      </p>
                      <p class="text-sm mt-2">
                        <strong>Dosage:</strong> {{ supplement.dosage }}
                      </p>

                      <ul
                        class="list-disc list-inside mt-2 text-sm text-gray-700"
                      >
                        <li
                          v-for="benefit in supplement.benefits"
                          :key="benefit"
                        >
                          {{ benefit }}
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <p class="mt-6 text-sm text-gray-700">
                    <strong>Explanation:</strong> {{ resultData.explanation }}
                  </p>
                </div>
              </template>
            </div>

            <div class="flex items-center justify-between mt-4">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                size="sm"
                @click="prevStep()"
              >
                Back
              </Button>
              <div class="flex items-center gap-3">
                <Button
                  v-if="stepIndex !== 3"
                  :type="meta.valid ? 'button' : 'submit'"
                  :disabled="isNextDisabled"
                  size="sm"
                  @click="meta.valid && nextStep()"
                >
                  Next
                </Button>
                <Button
                  v-if="stepIndex === 3"
                  size="sm"
                  type="button"
                  :disabled="!meta.valid || advicerStore.formLoading"
                  @click="onSubmitAndNext(values as AdvicerForm)"
                >
                  <LucideRefreshCcw
                    v-if="advicerStore.formLoading"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Stepper>
    </Form>
  </div>
</template>
