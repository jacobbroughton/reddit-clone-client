import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"

export const getElapsedTime = (date) => {
  // Split timestamp into [ Y, M, D, h, m, s ]
  const datePostedArr = date.split(/[- :]/)

  // Apply each element to the Date function
  const utcDate = new Date(
    Date.UTC(
      datePostedArr[0],
      datePostedArr[1] - 1,
      datePostedArr[2],
      datePostedArr[3],
      datePostedArr[4],
      datePostedArr[5]
    )
  )

  let elapsedTime = formatDistanceToNowStrict(utcDate, { addSuffix: true })
  let matchStr = elapsedTime.match(/\d+/g)
  let matchNum = parseInt(matchStr)

  if (matchNum <= 10 && elapsedTime.includes("seconds")) {
    elapsedTime = "a few seconds ago"
  }

  return elapsedTime
}
