import {Box, Card, CardContent, CardHeader, Menu, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {MoreVert} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import {useHttp} from "../../hooks/http.hook";
import {useAuthContext} from "../../context/AuthContext";

export const LinkCard = ({id, title, link, editHandler, updateLinks = () => {}}) => {

	const [anchorElMenu, setAnchorElMenu] = useState(null);

	const {request} = useHttp()
	const {userData} = useAuthContext()

	const openMenu = (event) => {
		setAnchorElMenu(event.currentTarget)
	}

	const closeMenu = () => {
		setAnchorElMenu(null)
	}

	const deleteHandler = () => {
		request(`/links/${id}`, 'DELETE', null, true).then(() => {
			toast.success('Ссылка удалена')
			closeMenu()
			updateLinks()
		})
	}


	return (
			<Card sx={{marginBottom: 3}}>
				<CardHeader
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
					title={title}
					subheader={<a href={link}>{link}</a>}
				/>
			</Card>
	)
}
