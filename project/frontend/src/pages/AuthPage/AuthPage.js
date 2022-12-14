import styles from './AuthPage.module.css';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {useHttp} from "../../hooks/http.hook";
import {useAuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";

export const AuthPage = () => {

	const navigate = useNavigate()
	const {request} = useHttp()
	const {login} = useAuthContext()

	const { handleSubmit, control, reset } = useForm()

	const onSubmit = async data => {
		// console.log(data)
		request('/account/sign-in', 'POST', data).then((userData) => {
			login(userData)
			toast.success('Вход в аккаунт выполнен')
		})
	}

	return (
		<div className={styles.page}>
			<Container>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Card sx={{ minWidth: 500 }}>
						<CardContent>
							<Typography variant="h4">
								Авторизация
							</Typography>
							<Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
								<Box margin="8px 0">
									<Controller
										name={"login"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"E-mail"}
											           required
											           type="email"
											           fullWidth/>
										)}
									/>
								</Box>
								<Box margin="8px 0">
									<Controller
										name={"password"}
										required
										fullWidth
										control={control}
										render={({field: {onChange, value}}) => (
											<TextField onChange={onChange} value={value} label={"Пароль"}
											           required
											           type="password"
											           fullWidth/>
										)}
									/>
								</Box>
								<CardActions>
									<Button type="submit">
										Войти
									</Button>
									<Button onClick={() => {navigate('/sign-up')}}>
										Регистрация
									</Button>
								</CardActions>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</Container>
		</div>
	)
}
