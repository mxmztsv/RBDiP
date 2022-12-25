export const parseDate = (timestamp) => {
	const date = new Date(Math.floor(timestamp))
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}
