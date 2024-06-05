"use client";

import { Button, Modal, Space } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { useAppDispatch } from "@/lib/hooks";
import { clearApi } from "@/lib/features/api";
import { clearLocal } from "@/lib/features/local";

export const ResetStateButton: React.FC = () => {
	const dispatch = useAppDispatch();

	const [modal, contextHolder] = Modal.useModal();

	const showConfirm = () => {
		modal.confirm({
			title: "Подтвердите действие",
			icon: <ExclamationCircleFilled />,
			content: (
				<Space
					style={{
						marginBottom: 6,
						fontSize: 14
					}}
				>
					Вы действительно хотите сбросить состояние?
				</Space>
			),
			okText: "Да",
			cancelText: "Нет",
			onOk() {
				dispatch(clearApi());
				dispatch(clearLocal());
			}
		});
	};

	return (
		<>
			{contextHolder}
			<Button className="state-button" onClick={showConfirm}>
				Сбросить состояние
			</Button>
		</>
	);
};

export default ResetStateButton;
