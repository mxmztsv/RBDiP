import {Box, Container, Typography} from "@mui/material";
import {Header} from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../api/api";
import {NewsCard} from "../../components/NewsCard/NewsCard";
import {parseDate} from "../../utils/parseDate";
import Button from "@mui/material/Button";
import {EditPostModal} from "../../components/EditPostModal/EditPostModal";

export const NewsPage = () => {

	const [posts, setPosts] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editObjectId, setEditObjectId] = useState(null)

	const getPosts = async () => {
		const response = await fetchPosts()
		setPosts(response)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setEditObjectId(null)
	}

	const editHandler = (id) => {
		setEditObjectId(id)
		openModal()
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<>
			<Header />
			<Container>
				<EditPostModal id={editObjectId} isOpen={isModalOpen} close={closeModal} />
				<Box display="flex" flexDirection="column" margin="40px 0">
					<Typography variant="h3">
						Новости группы
					</Typography>
				</Box>
				<Button variant="contained" onClick={openModal} sx={{margin: "0 0 20px 0"}}>Добавить новость</Button>
				<Box display="flex" flexDirection="column">
					{
						posts.map((post, index) => {
							return <NewsCard
								id={post.id}
								title={post.title}
								body={post.body}
								date={parseDate(post.created_at)}
								attachment={post.attachment}
								editHandler={editHandler}
								key={index}
							/>
						})
					}
				</Box>
			</Container>
		</>
	)
}
