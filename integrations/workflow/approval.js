export const editorialStates = ['draft', 'in_review', 'approved', 'scheduled', 'published', 'archived'];
export const allowedTransitions = {
  draft: ['in_review'],
  in_review: ['draft', 'approved'],
  approved: ['scheduled', 'published'],
  scheduled: ['published', 'draft'],
  published: ['archived'],
  archived: ['draft'],
};

export function canTransition(from, to) { return allowedTransitions[from]?.includes(to) ?? false; }
