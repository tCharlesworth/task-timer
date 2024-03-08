export function pad2(num) {
  return num.toString().padStart(2, '0')
}

export function timeToSeconds(time = '0:0:0') {
  const initialTime = time.split(':');

  const hours = initialTime.length >= 1 ? initialTime[0] : '0',
        minutes = initialTime.length >= 2 ? initialTime[1] : '0',
        seconds = initialTime.length >= 3 ? initialTime[2] : '0'

  let h = 0, m = 0, s = 0
  try {
    h = parseInt(hours) || 0
    m = parseInt(minutes) || 0
    s = parseInt(seconds) || 0
  } catch (err) { 
    console.error(err)
  }
  return (((h * 60) + m) * 60) + s
}

export function secondsToTime(seconds) {
  let h = 0, m = 0, s = 0;
  const minutes = seconds/60
  s = Math.floor((seconds)%60)
  m = Math.floor(minutes%60)
  h = Math.floor(minutes/60)
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`
}