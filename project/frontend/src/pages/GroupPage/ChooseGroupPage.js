import {Header} from "../../components/Header/Header";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	FormControl,
	InputLabel,
	Select,
	Typography
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import toast from "react-hot-toast";
import {useAuthContext} from "../../context/AuthContext";

export const ChooseGroupPage = () => {

	const [groups, setGroups] = useState([])

	const {request} = useHttp()
	const {login, userData} = useAuthContext()

	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			groupName: "",
		}
	})

	const onSubmit = async data => {
		// console.log(data)
		request(`/groups/${data.groupName}/join`, 'POST', null, true).then(() => {
			toast.success('Выполнено присоединение к группе')
			const user = userData
			user.groupName = data.groupName
			login(user)
			window.location.reload()
		})
	}

	const fetchGroups = async () => {
		const result = await request('/groups')
		setValue("groupName", result[0].name)
		setGroups(result)
	}

	useEffect(() => {
		fetchGroups()
	}, [])


	return (
		<>
			<Header />
				<Container>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
						<Card sx={{ minWidth: 500 }}>
							<CardContent>
								<Typography variant="h4">
									Выберите учебную группу
								</Typography>
								<Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
									<Box margin="30px 0 8px 0">
										<Controller
											name={"groupName"}
											rules={{required: true}}
											fullWidth
											control={control}
											render={({field: {onChange, value}}) => (
												<FormControl fullWidth>
													<InputLabel id="select-training-type-label">Учебная группа</InputLabel>
													<Select
														labelId="select-training-type-label"
														id="demo-simple-select"
														value={value}
														label="Учебная группа"
														onChange={onChange}
													>
														{groups.map(group => <MenuItem
															value={group.name} key={group.name}>{group.name}</MenuItem>)}
													</Select>
												</FormControl>
											)}
										/>
									</Box>
									<CardActions>
										<Button type="submit">
											Присоединится к группе
										</Button>
									</CardActions>
								</Box>
							</CardContent>
						</Card>
					</Box>
				</Container>
		</>
	)
}
