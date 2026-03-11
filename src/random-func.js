// Функция для поиска рандомного числа в указанном диапазоне с заданным количеством цифр после запятой
const getRandom = (min, max) => {
  if (min>=max || min<0 || max<0) {
    alert('Некорректный диапазон');
    return -1;
  }
  let randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
}

export {getRandom}
