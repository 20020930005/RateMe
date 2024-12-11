document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');
  const progressElements = document.querySelectorAll('.progress');
  const mainProgressLevels = {};

  // Load saved data from local storage
  sliders.forEach(slider => {
    const category = slider.getAttribute('data-category');
    const subtopic = slider.getAttribute('data-subtopic');
    const savedValue = localStorage.getItem(`${category}-${subtopic}`) || 0;
    slider.value = savedValue;

    const levelElement = document.querySelector(`.level[data-category="${category}"][data-subtopic="${subtopic}"]`);
    levelElement.textContent = `${savedValue}%`;
  });

  // Update main topic progress
  const updateMainProgress = (category) => {
    const subtopicSliders = document.querySelectorAll(`.slider[data-category="${category}"]`);
    const totalProgress = Array.from(subtopicSliders).reduce((sum, slider) => sum + Number(slider.value), 0);
    const avgProgress = Math.round(totalProgress / subtopicSliders.length);

    const mainProgressBar = document.querySelector(`.progress[data-category="${category}"]`);
    const mainLevelElement = document.querySelector(`.level[data-category="${category}"]`);

    mainProgressBar.style.width = `${avgProgress}%`;
    mainLevelElement.textContent = `${avgProgress}%`;

    // Save main progress
    mainProgressLevels[category] = avgProgress;
  };

  sliders.forEach(slider => {
    slider.addEventListener('input', (event) => {
      const category = event.target.getAttribute('data-category');
      const subtopic = event.target.getAttribute('data-subtopic');
      const value = event.target.value;

      // Update subtopic level
      const levelElement = document.querySelector(`.level[data-category="${category}"][data-subtopic="${subtopic}"]`);
      levelElement.textContent = `${value}%`;

      // Save subtopic progress
      localStorage.setItem(`${category}-${subtopic}`, value);

      // Update main topic progress
      updateMainProgress(category);
    });

    // Update on page load
    updateMainProgress(slider.getAttribute('data-category'));
  });
});


function saveFeedback() {
  // Get the value of the textarea
  const feedback = document.getElementById("feedbackText").value;

  // Save the feedback to local storage
  if (feedback) {
    localStorage.setItem("userFeedback", feedback);
    alert("Activity saved successfully!");
  } else {
    alert("Please add some activity or type None before add.");
  }
}

// Optional: Automatically load saved feedback when the page loads
window.onload = function() {
  const savedFeedback = localStorage.getItem("userFeedback");
  if (savedFeedback) {
    document.getElementById("feedbackText").value = savedFeedback;
  }
};

