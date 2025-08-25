import {
  FEEDBACK_MAX_LENGTH,
  FEEDBACK_MIN_LENGTH,
  FEEDBACK_TEXTAREA_MAX_ITEMS,
} from "@/constants/constants";

export const MANUAL_FEEDBACK_ERRORS = {
  REQUIRED: "Please enter at least one feedback.",
  MAX_ITEMS: `You can only add up to ${FEEDBACK_TEXTAREA_MAX_ITEMS} feedback at once.`,
  MIN_LENGTH: `Each feedback must be at least ${FEEDBACK_MIN_LENGTH} characters.`,
  MAX_LENGTH: `Each feedback must be no longer than ${FEEDBACK_MAX_LENGTH} characters.`,
};
