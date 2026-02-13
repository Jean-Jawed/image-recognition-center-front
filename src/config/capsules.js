/**
 * Capsules Configuration
 * Add new capsules here — they'll automatically appear in the UI
 * Each capsule corresponds to a processor in the backend
 */

export const CAPSULES = [
  {
    id: "hand_tracking",
    label: "Hand Track",
    description: "21 landmarks per hand",
    shortcut: "1",
  },
  {
    id: "pose_detection",
    label: "Pose",
    description: "Full body skeleton",
    shortcut: "2",
  },
  {
    id: "face_mesh",
    label: "Face Mesh",
    description: "468 facial points",
    shortcut: "3",
  },
  {
    id: "emotion_detection",
    label: "Emotion",
    description: "7 emotions analysis",
    shortcut: "4",
  },
  {
    id: "object_detection",
    label: "Objects",
    description: "80 class detection",
    shortcut: "5",
  },
];

/**
 * To add a new capsule:
 * 
 * 1. Add entry here:
 *    {
 *      id: "new_processor",       // Must match backend processor name
 *      label: "New Proc",         // Short display name
 *      description: "What it does",
 *      shortcut: "6",             // Keyboard shortcut (optional)
 *    }
 * 
 * 2. Add processor in backend/processors/new_processor.py
 * 
 * 3. Register in backend/processors/__init__.py
 * 
 * 4. Add to PROCESSORS dict in backend/main.py
 */
