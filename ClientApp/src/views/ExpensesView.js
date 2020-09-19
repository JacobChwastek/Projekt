import React, { Component } from "react";
import { Col, Row, Card, Form, Input, Button, Skeleton, message } from "antd";
import { api } from "../api";
import { NumericInput } from "../components/common";
import ExpensesList from "../components/ExpensesList";
import styled from "styled-components";
import _ from "lodash";

class ExpensesView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            expenses: [],
        };
    }

    formRef = React.createRef();

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { expenses, loading } = this.state;

        return (
            <Expenses>
                <ExpensesCard title="Wydatki" extra={<a href="legacy">Wersja przed refactoringiem</a>}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card title="Dodaj wydatek">
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    ref={this.formRef}
                                    initialValues={{ remember: true }}
                                    onFinish={this.onFinish}
                                    // onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Nazwa"
                                        name="name"
                                        rules={[{ required: true, message: "Podaj nazwę wydatku!" }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Wartość"
                                        name="value"
                                        rules={[{ required: true, message: "Podaj wartość produktu" }]}
                                    >
                                        <NumericInput />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Dodaj
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <ExpensesCard title="Lista wydatków">
                                {loading ? (
                                    <Skeleton />
                                ) : (
                                    <>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <ExpensesList expenses={expenses} onRemove={this.onRemove} />
                                            </Col>
                                            <Col span={24}>Suma: {this.sum()}</Col>
                                        </Row>
                                    </>
                                )}
                            </ExpensesCard>
                        </Col>
                    </Row>
                </ExpensesCard>
            </Expenses>
        );
    }

    onFinish = expense => {
        const newValue = {
            name: expense.name,
            value: parseFloat(expense.value) || 0,
        };

        api.post("/expenses", { ...newValue })
            .then(res => res.data)
            .then(() => {
                this.setState({ loading: true }, () => {
                    this.fetchData();
                    message.success("Dodano nowy wydatek wydatek!");
                });
            })
            .catch(() => {});
    };

    onRemove = id => {
        this.setState(
            prevState => {
                const expenses = prevState.expenses.filter(e => e.id !== id);
                return { expenses };
            },
            () => this.handleRemoveRequest(id)
        );
    };

    handleRemoveRequest = id => {
        api.delete(`/expenses/${id}`).then(() => message.info("Usunięto wydatek!"));
    };

    fetchData = () => {
        api.get("/expenses")
            .then(res => res.data)
            .then(res => this.setState({ expenses: res, loading: false }));
    };

    sum = () => { return _.sumBy(this.state.expenses, "value"); };
}

const Expenses = styled.div`
    padding-top: 50px;
`;

const ExpensesCard = styled(Card)`
    height: 100%;
`;

export default ExpensesView;
