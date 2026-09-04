const factors = [
  ['businessEmail', 15, x => !!x],
  ['companyProvided', 15, x => !!x],
  ['serviceInterest', 20, x => !!x],
  ['messageQuality', 20, x => typeof x === 'string' && x.trim().length >= 80],
  ['budgetProvided', 15, x => !!x],
  ['timelineProvided', 15, x => !!x],
];

export function scoreLead(input) {
  let score = 0;
  const reasons = [];
  for (const [name, points, test] of factors) if (test(input[name])) { score += points; reasons.push({ name, points }); }
  return { score, tier: score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold', reasons };
}
