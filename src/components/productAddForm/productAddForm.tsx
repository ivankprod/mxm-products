"use client";

import { Button, Form, FormProps, Input, InputNumber, Select, notification } from "antd";

import { useAppDispatch } from "@/lib/hooks";
import { productAddFormErrors, statuses } from "@/lib/constants";
import { useAddProductMutation } from "@/lib/features/api";
import { addProduct } from "@/lib/features/local";
import { TAddProductDTO } from "@/types/product";

export const ProductAddForm: React.FC = () => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();

	const dispatch = useAppDispatch();
	const [addProductAPI] = useAddProductMutation();

	const onSubmit: FormProps<TAddProductDTO>["onFinish"] = async (values) => {
		try {
			await addProductAPI(values).unwrap();

			api.success({
				message: "API",
				description: "Продукт успешно создан",
				placement: "top"
			});

			dispatch(addProduct(values));

			form.resetFields();
		} catch (e: any) {
			api.error({
				message: `API: Ошибка ${e?.status}`,
				description: e?.data?.message,
				placement: "top"
			});
		}
	};

	return (
		<Form
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name="product-add-form"
			scrollToFirstError
			onFinish={onSubmit}
			initialValues={{ status: statuses.unpublished.value }}
			style={{ padding: 12 }}
		>
			<Form.Item<TAddProductDTO>
				name="title"
				label="Название"
				rules={[{ required: true, message: productAddFormErrors["NO_TITLE"] }]}
			>
				<Input />
			</Form.Item>
			<Form.Item<TAddProductDTO>
				name="description"
				label="Описание"
				rules={[{ required: true, message: productAddFormErrors["NO_DESCRIPTION"] }]}
			>
				<Input.TextArea />
			</Form.Item>
			<Form.Item<TAddProductDTO>
				name="price"
				label="Цена"
				rules={[{ required: true, message: productAddFormErrors["NO_PRICE"] }]}
			>
				<InputNumber min={1} style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item<TAddProductDTO> name="status" label="Статус">
				<Select options={[statuses.published, statuses.unpublished]} />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<>
					{contextHolder}
					<Button type="primary" htmlType="submit">
						Создать
					</Button>
				</>
			</Form.Item>
		</Form>
	);
};

export default ProductAddForm;
