import React from "react";
import { Button, Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Expense = ({ data, onRemove }) => {
    const showDeleteConfirm = () => {
        confirm({
            title: "Czy na pewno chcesz usunąć wydatek z listy?",
            icon: <ExclamationCircleOutlined />,
            content: "Some descriptions",
            okText: "Tak",
            okType: "danger",
            cancelText: "Nie",
            onOk() {
                onRemove(data.id);
            },
            onCancel() {},
        });
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>{data.name}</Col>
            <Col span={8}>{data.value}</Col>
            <Col span={8}>
                <Button onClick={showDeleteConfirm} danger>
                    Usuń
                </Button>
            </Col>
        </Row>
    );
};

export default Expense;
