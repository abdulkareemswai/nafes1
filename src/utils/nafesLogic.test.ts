/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuizScore,
  evaluateSubjectProficiency,
  formatSeconds,
  calculateScheduleProgress,
  generateCertificateCode,
} from './nafesLogic.ts';

test('calculateQuizScore computes correct score and bonus', () => {
  const result = calculateQuizScore(5, 5, 60, 300);
  assert.equal(result.accuracyPercentage, 100);
  assert.equal(result.pointsEarned, 324);
  assert.equal(result.timeBonus, 74);
});

test('calculateQuizScore with zero correct yields 0 points', () => {
  const result = calculateQuizScore(0, 5, 200, 300);
  assert.equal(result.accuracyPercentage, 0);
  assert.equal(result.pointsEarned, 0);
  assert.equal(result.timeBonus, 0);
});

test('evaluateSubjectProficiency determines correct tier and recommendations', () => {
  const high = evaluateSubjectProficiency('math', 9, 10);
  assert.equal(high.level, 'متقدم');
  assert.equal(high.percentage, 90);

  const medium = evaluateSubjectProficiency('arabic', 7, 10);
  assert.equal(medium.level, 'متمكن');

  const progress = evaluateSubjectProficiency('science', 6, 10);
  assert.equal(progress.level, 'في طور التقدم');

  const low = evaluateSubjectProficiency('science', 3, 10);
  assert.equal(low.level, 'يحتاج دعم');
});

test('formatSeconds correctly formats mm:ss', () => {
  assert.equal(formatSeconds(0), '00:00');
  assert.equal(formatSeconds(65), '01:05');
  assert.equal(formatSeconds(600), '10:00');
});

test('calculateScheduleProgress handles percentages and empty sets', () => {
  assert.equal(calculateScheduleProgress([], 14), 0);
  assert.equal(calculateScheduleProgress(['task-1', 'task-2', 'task-3'], 10), 30);
  assert.equal(calculateScheduleProgress(['1', '2', '3', '4'], 4), 100);
});

test('generateCertificateCode creates distinct verification code', () => {
  const code = generateCertificateCode('عبد الكريم', '2026-10-27');
  assert.match(code, /^NAFES-20261027-/);
});
