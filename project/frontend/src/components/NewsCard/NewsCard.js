import {Box, Card, CardContent, CardHeader, Menu, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {MoreVert} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {useAuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import toast from "react-hot-toast";

export const NewsCard = ({id, title, body, date, attachment, editHandler, updateNews = () => {}}) => {

	const [anchorElMenu, setAnchorElMenu] = useState(null);

	const {userData} = useAuthContext()
	const {request} = useHttp()

	const openMenu = (event) => {
		setAnchorElMenu(event.currentTarget)
	}

	const closeMenu = () => {
		setAnchorElMenu(null)
	}

	const deleteHandler = () => {
		request(`/posts/${id}`, 'DELETE', null, true).then(() => {
			toast.success('Новость удалена')
			closeMenu()
			updateNews()
		})
	}

	return (
		<Card sx={{marginBottom: 3}}>
			<CardHeader
				avatar={
					<Avatar>A</Avatar>
				}
				action={
				userData.isAdmin &&
					<>
					<IconButton onClick={openMenu}>
						<MoreVert/>
					</IconButton>
					<Menu
						// sx={{mt: '45px'}}
						id="menu-news"
						anchorEl={anchorElMenu}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElMenu)}
						onClose={closeMenu}
					>
						<MenuItem onClick={() => {editHandler(id)}}>
							<Typography textAlign="center">Редактировать</Typography>
						</MenuItem>
						<MenuItem onClick={deleteHandler}>
							<Typography textAlign="center">Удалить</Typography>
						</MenuItem>
					</Menu>
					</>
				}
				title="Админ"
				subheader={date}
			/>
			<CardContent>
				<Typography variant="h5">
					{title}
				</Typography>
				<Typography variant="body1">
					{body}
				</Typography>
				{
					attachment &&
					<Box sx={{margin: "20px 0 0 0"}}>
						<Typography variant="body1">
							Вложение:
						</Typography>
						<a href={attachment.link}>{attachment.name}</a>
					</Box>
				}
			</CardContent>
		</Card>
	)
}
