"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Flex, Form, FormProps, Input, InputNumber, Select, notification } from "antd";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { productAddFormErrors, statuses } from "@/lib/constants";
import { useUpdateProductMutation } from "@/lib/features/api";
import { updateProduct } from "@/lib/features/local";
import { TProduct, TUpdateProductDTO } from "@/types/product";

interface IProductUpdateForm {
	productID: string;
}

export const ProductUpdateForm: React.FC<IProductUpdateForm> = ({ productID }) => {
	const [form] = Form.useForm();
	const [canSave, setCanSave] = useState(false);

	const [api, contextHolder] = notification.useNotification();

	const product = useAppSelector((state) =>
		state.local.find((product) => product.id == productID)
	);
	if (!product) notFound();

	const dispatch = useAppDispatch();
	const [updateProductAPI] = useUpdateProductMutation();

	const onSubmit: FormProps<TUpdateProductDTO>["onFinish"] = async (values) => {
		try {
			await updateProductAPI(values).unwrap();

			api.success({
				message: "API",
				description: "Продукт успешно обновлен",
				placement: "top"
			});

			dispatch(updateProduct(values));
			setCanSave(false);
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
			name="product-update-form"
			scrollToFirstError
			onFinish={onSubmit}
			onValuesChange={(_, values) => {
				let k: keyof typeof values;

				for (k in values) {
					if (values[k] != product[k]) {
						setCanSave(true);

						break;
					}

					setCanSave(false);
				}
			}}
			initialValues={{ ...product }}
			style={{ padding: 12 }}
		>
			<Form.Item<TProduct>
				name="id"
				label="ID"
			>
				<Input disabled />
			</Form.Item>
			<Form.Item<TProduct>
				name="title"
				label="Название"
				rules={[{ required: true, message: productAddFormErrors["NO_TITLE"] }]}
			>
				<Input />
			</Form.Item>
			<Form.Item<TProduct>
				name="description"
				label="Описание"
				rules={[{ required: true, message: productAddFormErrors["NO_DESCRIPTION"] }]}
			>
				<Input.TextArea />
			</Form.Item>
			<Form.Item<TProduct>
				name="price"
				label="Цена"
				rules={[{ required: true, message: productAddFormErrors["NO_PRICE"] }]}
			>
				<InputNumber min={1} style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item<TProduct> name="status" label="Статус">
				<Select options={[statuses.published, statuses.unpublished]} />
			</Form.Item>
			<Form.Item wrapperCol={{ sm: { offset: 8, span: 16 } }}>
				<Flex wrap gap="small" justify="space-between">
					{contextHolder}
					<Button type="primary" htmlType="submit" disabled={!canSave}>
						Сохранить
					</Button>
					<Link href="/products" passHref>
						<Button type="primary">
							Отмена
						</Button>
					</Link>
				</Flex>
			</Form.Item>
		</Form>
	);
};

export default ProductUpdateForm;
