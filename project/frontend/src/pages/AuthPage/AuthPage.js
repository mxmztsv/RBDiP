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
import {useState} from "react";

export const AuthPage = () => {

	const [registration, setRegistration] = useState(false);

	return (
		<div className={styles.page}>
			<Container>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<Card sx={{ minWidth: 500 }}>
						<CardContent>
							<Typography variant="h4">
								{registration ? "Регистрация" : "Авторизация"}
							</Typography>
							<Box component="form" display="flex" flexDirection="column">
								{
									registration ? (
										<>
											<Box margin="8px 0">
												<TextField label="Имя" required type="name" fullWidth />
											</Box>
											<Box margin="8px 0">
												<TextField label="Фамилия" required type="surname" fullWidth />
											</Box>
											<Box margin="8px 0">
												<TextField label="E-mail" required type="email" fullWidth />
											</Box>
											<Box margin="8px 0">
												<TextField label="Пароль" required type="password" fullWidth />
											</Box>
											<Box margin="8px 0">
												<FormControlLabel control={<Checkbox />} label="Староста группы" />
											</Box>

										</>
									) : (
										<>
											<Box margin="8px 0">
												<TextField label="Логин" required type="email" fullWidth />
											</Box>
											<Box margin="8px 0">
												<TextField label="Пароль" required type="password" fullWidth />
											</Box>
										</>
									)
								}

							</Box>
						</CardContent>
						<CardActions>
							{
								registration ? (
									<>
										<Button>
											Зарегистрироваться
										</Button>
										<Button onClick={() => {setRegistration(false)}}>
											Вход
										</Button>
									</>
								) : (
									<>
										<Button>
											Войти
										</Button>
										<Button onClick={() => {setRegistration(true)}}>
											Регистрация
										</Button>
									</>
								)
							}

						</CardActions>
					</Card>
				</Box>
			</Container>
		</div>
	)
}
