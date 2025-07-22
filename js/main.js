document.addEventListener('DOMContentLoaded', () => {
  // Button references
  const fabricationBtn = document.getElementById('fabrication-btn');
//   const rebuildBtn = document.getElementById('rebuild-btn');
  const machiningBtn = document.getElementById('machining-btn');

  // Event listeners
  fabricationBtn.addEventListener('click', () => showContent('fabrication'));
//   rebuildBtn.addEventListener('click', () => showContent('rebuild'));
  machiningBtn.addEventListener('click', () => showContent('machining'));
});
