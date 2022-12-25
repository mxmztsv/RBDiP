import {Box, Container, Typography} from "@mui/material";
import {Header} from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../api/api";
import {NewsCard} from "../../components/NewsCard/NewsCard";
import {parseDate} from "../../utils/parseDate";
import Button from "@mui/material/Button";
import {EditPostModal} from "../../components/EditPostModal/EditPostModal";
import {useAuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

export const NewsPage = () => {

	const [posts, setPosts] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editObjectId, setEditObjectId] = useState(null)
	const [shouldUpdate, setShouldUpdate] = useState(false)

	const {userData} = useAuthContext()
	const {request} = useHttp()

	const getPosts = async () => {
		request('/posts', 'GET', null, true).then((response) => {
			setPosts(response.reverse())
		})
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

	const update = () => {
		setShouldUpdate(prevState => !prevState)
	}

	useEffect(() => {
		getPosts()
	}, [shouldUpdate])

	return (
		<>
			<Header />
			<Container>
				<EditPostModal id={editObjectId} isOpen={isModalOpen} close={closeModal} updateNews={update}/>
				<Box display="flex" flexDirection="column" margin="40px 0">
					<Typography variant="h3">
						Новости группы {userData.groupName}
					</Typography>
				</Box>
				{ userData.isAdmin && <Button variant="contained" onClick={openModal} sx={{margin: "0 0 20px 0"}}>Добавить новость</Button> }
				<Box display="flex" flexDirection="column">
					{
						posts.map((post, index) => {
							return <NewsCard
								id={post.id}
								title={post.title}
								body={post.body}
								date={parseDate(post.createdAt)}
								attachment={post.attachment}
								editHandler={editHandler}
								updateNews={update}
								key={index}
							/>
						})
					}
				</Box>
			</Container>
		</>
	)
}
