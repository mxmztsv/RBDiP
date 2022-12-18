import {Box, Card, CardContent, CardHeader, Menu, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {MoreVert} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export const NewsCard = ({id, title, body, date, attachment, editHandler}) => {

	const [anchorElMenu, setAnchorElMenu] = useState(null);

	const openMenu = (event) => {
		setAnchorElMenu(event.currentTarget)
	}

	const closeMenu = () => {
		setAnchorElMenu(null)
	}

	return (
		<Card sx={{marginBottom: 3}}>
			<CardHeader
				avatar={
					<Avatar>A</Avatar>
				}
				action={
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
						<MenuItem onClick={closeMenu}>
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
			</CardContent>
		</Card>
	)
}
