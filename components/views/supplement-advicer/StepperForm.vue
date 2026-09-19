<script setup lang="ts">
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

const steps = ["Basic info", "Health goals", "Lifestyle", "Your protocol"];

const step = ref(1);
const error = ref<string | null>(null);

// Un objectif choisi depuis l'accueil (?goal=…) arrive déjà coché
const initialGoal = goals.find((goal) => goal.id === route.query.goal)?.id;

const form = reactive<AdvicerForm>({
  age: null as unknown as number,
  gender: "",
  goals: initialGoal ? [initialGoal] : [],
  healthIssues: [],
  sleepQuality: "",
  stressLevel: "",
});

const ageIsValid = computed(
  () => Number.isInteger(form.age) && form.age >= 1 && form.age <= 120
);

const canContinue = computed(() => {
  if (step.value === 1) return ageIsValid.value && form.gender !== "";
  if (step.value === 2) return form.goals.length > 0;
  if (step.value === 3) return form.sleepQuality !== "" && form.stressLevel !== "";
  return false;
});

const toggleGoal = (id: string) => {
  form.goals = form.goals.includes(id)
    ? form.goals.filter((goal) => goal !== id)
    : [...form.goals, id];
};

// « Aucun » exclut les autres réponses, et inversement
const toggleIssue = (id: string) => {
  if (id === "none") {
    form.healthIssues = form.healthIssues.includes("none") ? [] : ["none"];
    return;
  }
  const others = form.healthIssues.filter((issue) => issue !== "none");
  form.healthIssues = others.includes(id)
    ? others.filter((issue) => issue !== id)
    : [...others, id];
};

const labelOf = (list: { id: string; label: string }[], id: string) =>
  list.find((item) => item.id === id)?.label ?? id;

const summary = computed(() => {
  if (step.value > 1 && ageIsValid.value) {
    return { 1: `${labelOf(genders, form.gender)}, ${form.age}` } as Record<number, string>;
  }
  return {} as Record<number, string>;
});

const back = () => {
  error.value = null;
  step.value = Math.max(1, step.value - 1);
};

const submit = async () => {
  error.value = null;
  try {
    await advicerStore.getSupplementRecommendations({ ...form });
    step.value = 4;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    error.value = "The advisor didn’t answer. Please try again in a moment.";
  }
};

const next = () => {
  if (!canContinue.value) return;
  if (step.value === 3) {
    submit();
  } else {
    step.value += 1;
  }
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
    :form="form"
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
      <ol aria-label="Steps" class="hidden flex-col lg:flex">
        <li
          v-for="(title, index) in steps"
          :key="title"
          :aria-current="step === index + 1 ? 'step' : undefined"
          class="flex items-center gap-4 border-t py-[18px] last:border-b"
        >
          <span
            v-if="step > index + 1"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background"
          >
            <LucideCheck class="h-4 w-4" />
          </span>
          <span
            v-else
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-full font-mono text-[13px]',
              step === index + 1
                ? 'border-2 border-primary text-primary'
                : 'border text-muted-foreground',
            ]"
          >
            0{{ index + 1 }}
          </span>
          <span
            :class="[
              'flex-1 text-[17px]',
              step === index + 1 && 'font-semibold',
              step < index + 1 && 'text-muted-foreground',
            ]"
          >
            {{ title }}
          </span>
          <span v-if="summary[index + 1]" class="font-mono text-xs text-muted-foreground">
            {{ summary[index + 1] }}
          </span>
        </li>
      </ol>
      <p class="hidden text-sm leading-relaxed text-muted-foreground lg:block">
        Your answers are only used to generate this protocol. Nothing is stored.
      </p>
    </aside>

    <form
      class="flex flex-col gap-10 rounded-[20px] border bg-card p-6 md:p-12"
      @submit.prevent="next"
    >
      <div class="flex flex-col gap-3">
        <p class="font-mono text-xs tracking-[0.08em] text-muted-foreground md:text-[13px]">
          STEP {{ step }} OF 4
        </p>

        <template v-if="step === 1">
          <h2 class="text-3xl md:text-[40px]">First, a little about you.</h2>
          <p class="text-muted-foreground md:text-[17px]">Doses depend on both.</p>
        </template>
        <template v-else-if="step === 2">
          <h2 class="text-3xl md:text-[40px]">What do you want to improve?</h2>
          <p class="text-muted-foreground md:text-[17px]">
            Choose as many as apply.
            <span class="font-mono text-[13px] text-primary">{{ form.goals.length }} SELECTED</span>
          </p>
        </template>
        <template v-else>
          <h2 class="text-3xl md:text-[40px]">How are your nights and days?</h2>
          <p class="text-muted-foreground md:text-[17px]">An honest answer gives a better protocol.</p>
        </template>
      </div>

      <!-- Étape 1 -->
      <div v-if="step === 1" class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
          <label for="age" class="font-display text-2xl">Age</label>
          <input
            id="age"
            v-model.number="form.age"
            type="number"
            inputmode="numeric"
            min="1"
            max="120"
            placeholder="34"
            class="h-14 w-40 rounded-full border border-foreground/40 bg-background px-6 font-mono text-lg outline-none focus:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <fieldset class="flex flex-col gap-3">
          <legend class="mb-3 font-display text-2xl">Sex</legend>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="gender in genders"
              :key="gender.id"
              type="button"
              class="chip"
              :aria-pressed="form.gender === gender.id"
              @click="form.gender = gender.id"
            >
              {{ gender.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <!-- Étape 2 -->
      <div v-else-if="step === 2" class="flex flex-col gap-10">
        <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <button
            v-for="goal in goals"
            :key="goal.id"
            type="button"
            :aria-pressed="form.goals.includes(goal.id)"
            :class="[
              'flex min-h-[112px] flex-col justify-between gap-3 rounded-[14px] border p-4 text-left transition-colors md:p-[18px]',
              form.goals.includes(goal.id)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'bg-white hover:border-foreground dark:bg-background',
            ]"
            @click="toggleGoal(goal.id)"
          >
            <span class="flex w-full items-center justify-between gap-2 font-semibold">
              {{ goal.label }}
              <LucideCheck v-if="form.goals.includes(goal.id)" class="h-[18px] w-[18px] shrink-0" />
            </span>
            <span
              :class="[
                'text-[13px] leading-snug',
                form.goals.includes(goal.id) ? 'opacity-85' : 'text-muted-foreground',
              ]"
            >
              {{ goal.hint }}
            </span>
          </button>
        </div>

        <fieldset class="flex flex-col gap-4">
          <legend class="mb-4 flex items-baseline gap-3">
            <span class="font-display text-2xl">Anything we should know?</span>
            <span class="font-mono text-xs text-muted-foreground">OPTIONAL</span>
          </legend>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="issue in healthIssues"
              :key="issue.id"
              type="button"
              class="chip"
              :aria-pressed="form.healthIssues.includes(issue.id)"
              @click="toggleIssue(issue.id)"
            >
              {{ issue.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <!-- Étape 3 -->
      <div v-else class="flex flex-col gap-10">
        <fieldset>
          <legend class="mb-4 font-display text-2xl">Sleep quality</legend>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="option in sleepQualities"
              :key="option.id"
              type="button"
              class="chip"
              :aria-pressed="form.sleepQuality === option.id"
              @click="form.sleepQuality = option.id"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend class="mb-4 font-display text-2xl">Stress level</legend>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="option in stressLevels"
              :key="option.id"
              type="button"
              class="chip"
              :aria-pressed="form.stressLevel === option.id"
              @click="form.stressLevel = option.id"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <p v-if="error" role="alert" class="text-sm text-destructive">{{ error }}</p>

      <div class="mt-auto flex items-center gap-4 border-t pt-7 md:gap-6">
        <button
          v-if="step > 1"
          type="button"
          class="btn-outline h-[52px] px-6"
          :disabled="advicerStore.formLoading"
          @click="back"
        >
          Back
        </button>
        <div
          class="h-1 flex-1 overflow-hidden rounded-full bg-rule"
          role="progressbar"
          :aria-valuenow="step"
          aria-valuemin="1"
          aria-valuemax="4"
          :aria-label="`Step ${step} of 4`"
        >
          <div class="h-1 bg-primary transition-all duration-500" :style="{ width: `${(step / 4) * 100}%` }" />
        </div>
        <button
          type="submit"
          class="btn-primary h-[52px]"
          :disabled="!canContinue || advicerStore.formLoading"
        >
          <template v-if="advicerStore.formLoading">
            <LucideLoaderCircle class="h-[18px] w-[18px] animate-spin" />
            Thinking…
          </template>
          <template v-else-if="step === 3">
            Get my protocol
            <LucideArrowRight class="h-[18px] w-[18px]" />
          </template>
          <template v-else>
            Continue
            <LucideArrowRight class="h-[18px] w-[18px]" />
          </template>
        </button>
      </div>
    </form>
  </div>
</template>
