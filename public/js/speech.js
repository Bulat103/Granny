console.log('hello worl');
const btn = document.querySelector('#audio');
btn.addEventListener('click', () => {
  const description = document.querySelector('#description').innerText;
  responsiveVoice.speak(description);
  console.log(description);
});
