// tutors.js — Filter logic for tutors.html

(function () {
  'use strict';

  let activeGrade = 'all';
  let activeSubject = 'all';

  const cards = document.querySelectorAll('.tutor-card');
  const resultsCount = document.getElementById('resultsCount');
  const tutorsEmpty = document.getElementById('tutorsEmpty');

  // ---------- GRADE PILLS ----------
  document.querySelectorAll('.grade-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.grade-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeGrade = pill.dataset.grade;
      applyFilters();
    });
  });

  // ---------- SUBJECT PILLS ----------
  document.querySelectorAll('.subject-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeSubject = pill.dataset.subject;
      applyFilters();
    });
  });

  // ---------- RESET ----------
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.grade-pill').forEach(p => p.classList.remove('active'));
      document.querySelector('.grade-pill[data-grade="all"]').classList.add('active');
      document.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('active'));
      document.querySelector('.subject-pill[data-subject="all"]').classList.add('active');
      activeGrade = 'all';
      activeSubject = 'all';
      applyFilters();
    });
  }

  // ---------- FILTER LOGIC ----------
  function applyFilters() {
    let visible = 0;

    cards.forEach(card => {
      const cardGrades = card.dataset.grades.split(',').map(g => g.trim());
      const cardSubjects = card.dataset.subjects.split(',').map(s => s.trim());

      const gradeMatch = activeGrade === 'all' || cardGrades.includes(activeGrade);
      const subjectMatch = activeSubject === 'all' || cardSubjects.includes(activeSubject);

      if (gradeMatch && subjectMatch) {
        card.classList.remove('hidden');
        // Animate in
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'tutorCardIn 0.35s ease forwards';
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update count
    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${visible}</strong> tutor${visible !== 1 ? 's' : ''}`;
    }

    // Show/hide empty state
    if (tutorsEmpty) {
      tutorsEmpty.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  // ---------- ANIMATE IN KEYFRAMES ----------
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tutorCardIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Initial count
  applyFilters();
})();
