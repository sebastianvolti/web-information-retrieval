// Types
import {
  UPDATE_DATA,
} from "./types";

/**
 * ========================================
 *                 DATA
 * ========================================
 */
export function updateData(payload) {
  return {
    type: UPDATE_DATA,
    payload
  };
}
