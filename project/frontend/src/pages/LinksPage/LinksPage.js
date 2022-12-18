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

export const LinksPage = () => {

	const [links, setLinks] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editObjectId, setEditObjectId] = useState(null)

	const getLinks = async () => {
		const response = await fetchLinks()
		setLinks(response)
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
		getLinks()
	}, [])

	return (
		<>
			<Header />
			<Container>
				<EditLinkModal id={editObjectId} isOpen={isModalOpen} close={closeModal} />
				<Box display="flex" flexDirection="column" margin="40px 0">
					<Typography variant="h3">
						Важные ссылки группы
					</Typography>
				</Box>
				<Button variant="contained" onClick={openModal} sx={{margin: "0 0 20px 0"}}>Добавить ссылку</Button>
				<Box display="flex" flexDirection="column">
					{
						links.map((link, index) => {
							return <LinkCard
								id={link.id}
								title={link.title}
								link={link.link}
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
