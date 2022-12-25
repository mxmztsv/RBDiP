import {Box, Container, Typography} from "@mui/material";
import {Header} from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {fetchLinks, fetchPosts} from "../../api/api";
import {NewsCard} from "../../components/NewsCard/NewsCard";
import {parseDate} from "../../utils/parseDate";
import Button from "@mui/material/Button";
import {EditPostModal} from "../../components/EditPostModal/EditPostModal";
import {LinkCard} from "../../components/LinkCard/LinkCard";
import {EditLinkModal} from "../../components/EditLinkModal/EditLinkModal";
import {useHttp} from "../../hooks/http.hook";
import {useAuthContext} from "../../context/AuthContext";

export const LinksPage = () => {

	const [links, setLinks] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editObjectId, setEditObjectId] = useState(null)
	const [shouldUpdate, setShouldUpdate] = useState(false)

	const {request} = useHttp()
	const {userData} = useAuthContext()

	const getLinks = async () => {
		request('/links', 'GET', null, true).then((response) => {
			setLinks(response.reverse())
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
		getLinks()
	}, [shouldUpdate])

	return (
		<>
			<Header />
			<Container>
				<EditLinkModal id={editObjectId} isOpen={isModalOpen} close={closeModal} updateLinks={update} />
				<Box display="flex" flexDirection="column" margin="40px 0">
					<Typography variant="h3">
						Важные ссылки группы {userData.groupName}
					</Typography>
				</Box>
				{ userData.isAdmin && <Button variant="contained" onClick={openModal} sx={{margin: "0 0 20px 0"}}>Добавить ссылку</Button> }
				<Box display="flex" flexDirection="column">
					{
						links.map((link, index) => {
							return <LinkCard
								id={link.id}
								title={link.title}
								link={link.link}
								editHandler={editHandler}
								updateLinks={update}
								key={index}
							/>
						})
					}
				</Box>
			</Container>
		</>
	)
}
