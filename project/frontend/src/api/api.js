export const fetchPosts = async () => {
	const posts = [
		{
			"id": 321,
			"title": "Заголовок поста",
			"body": "Текс в теле поста",
			"created_at": "1670418550",
			"attachment": {
				"id": 456,
				"name": "приложенный_файл.pdf",
				"link": "https://objectstorage.ru/4283742"
			}
		},
		{
			"id": 765,
			"title": "Заголовок поста",
			"body": "Текс в теле поста",
			"created_at": "1670418550",
			"attachment": {
				"id": 456,
				"name": "приложенный_файл.pdf",
				"link": "https://objectstorage.ru/4283742"
			}
		},
	]

	return posts
}

export const fetchLinks = async () => {
	const links = [
		{
			"id": 732,
			"title": "Название ссылки",
			"link": "https://docs.google.com/document/d/1nC_0Z7KYbspPIaM6Ylfdwt_1ZxIE0PH-lFT3UpsfnBc/edit"
		},
		{
			"id": 12,
			"title": "Название ссылки",
			"link": "https://docs.google.com/document/d/1nC_0Z7KYbspPIaM6Ylfdwt_1ZxIE0PH-lFT3UpsfnBc/edit"
		},
		{
			"id": 32,
			"title": "Название ссылки",
			"link": "https://docs.google.com/document/d/1nC_0Z7KYbspPIaM6Ylfdwt_1ZxIE0PH-lFT3UpsfnBc/edit"
		},
		{
			"id": 45,
			"title": "Название ссылки",
			"link": "https://docs.google.com/document/d/1nC_0Z7KYbspPIaM6Ylfdwt_1ZxIE0PH-lFT3UpsfnBc/edit"
		}
	]

	return links
}
