import { Button, ButtonProps, Flex, Result } from "antd";

import { signIn, signOut } from "@/auth";

interface IAuthButtonProps {
	provider?: string;
}

export const SignIn: React.FC<IAuthButtonProps & ButtonProps> = ({ provider, ...otherProps }) => {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<Button htmlType="submit" {...otherProps}>
				Войти
			</Button>
		</form>
	);
};

export const SignOut: React.FC<ButtonProps> = ({ ...otherProps }) => {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button htmlType="submit" {...otherProps}>
				Выйти
			</Button>
		</form>
	);
};

export const AccessDeniedError: React.FC = () => {
	return (
		<Result
			status={403}
			title="Ошибка 403"
			subTitle={
				<Flex vertical gap="large">
					Доступ запрещен
					<SignIn type={"primary"} />
				</Flex>
			}
		/>
	);
};
