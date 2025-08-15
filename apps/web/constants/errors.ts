import {
  FEEDBACK_MAX_ITEMS,
  FEEDBACK_MAX_LENGTH,
  FEEDBACK_MIN_LENGTH,
} from "@/constants/constants";

export const MANUAL_FEEDBACK_ERRORS = {
  REQUIRED: "Please enter at least one feedback.",
  MAX_ITEMS: `You can only submit up to ${FEEDBACK_MAX_ITEMS} feedback at once.`,
  MIN_LENGTH: `Each feedback must be at least ${FEEDBACK_MIN_LENGTH} characters.`,
  MAX_LENGTH: `Each feedback must be no longer than ${FEEDBACK_MAX_LENGTH} characters.`,
};
