function estimateTime(lengthOfQueue){
  let timeNow = new Date()
  let hoursNow = timeNow.getHours()
  let hoursEstimate = new Date(timeNow.setMinutes(timeNow.getMinutes()+(lengthOfQueue*5))).getHours()
  let minutesNow = timeNow.getMinutes()
  let minutesEstimate =  new Date(timeNow.setMinutes(timeNow.getMinutes()+(lengthOfQueue*5))).getMinutes()
  return `${hoursEstimate - hoursNow} hours ${Math.abs(minutesEstimate - minutesNow)} minutes`
}


module.exports = estimateTime
