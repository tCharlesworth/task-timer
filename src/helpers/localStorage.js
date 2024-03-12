/**
 * @typedef {Object} Clock
 * @property {string} id
 * @property {string} name
 * @property {('stopwatch' | 'timer')} type
 */

/**
 * @typedef {Object} Stopwatch
 * @augments Clock
 * @property {('stopwatch')} type
 * @property {string} startTime
 * @property {number} accumulated
 */

const CLOCKS_KEY = 'task-timer-clocks';


/**
 * @returns {Array.<Clock>}
 */
export function GetStoredClocks() {
  try {
    const raw = localStorage.getItem(CLOCKS_KEY) || ''
    if(raw) {
      const data = JSON.parse(raw)
      return data
    }
  } catch (err) {
    console.error(err)
  }
  return []
}

/**
 * 
 * @param {Array.<Clock>} clocks 
 * @returns {boolean} Returns false if there was an error saving
 */
export function SetStoredClocks(clocks) {
  try {
    const raw = JSON.stringify(clocks)
    localStorage.setItem(CLOCKS_KEY, raw)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export function UpdateStoredClock(clock) {
  try {
    const d = GetStoredClocks()

    let changed = false
    let newData = d.map((c)=>{
      if(c.id === clock.id) {
        changed = true
        return clock
      }
      return c
    })

    if(!changed) {
      console.log('failed to update storage')
    } else {
      SetStoredClocks(newData)
      console.log('save', clock)
    }
  } catch (err) {
    console.error(err)
  }
}