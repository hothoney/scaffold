import React from 'react';
import {
  Input,
  TableColumnProps,
  Form,
  Grid,
  Button,
} from '@arco-design/web-react';
import styled from 'styled-components';

const { Col, Row } = Grid;

interface TableFilterProps extends TableColumnProps {}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  gap: 10px;
`;

const TableFilter = ({
  columns,
  onSubmit,
}: {
  columns: TableFilterProps[];
  onSubmit?: (values: object) => unknown;
}) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} size='small' onSubmit={onSubmit}>
      <Wrapper>
        <Row gutter={20} style={{ flex: 1 }}>
          {columns.map((column) => (
            <Col xl={8} md={12} xs={24} key={column.key}>
              <Form.Item
                label={column.title}
                field={column.dataIndex}
                labelAlign='left'
              >
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>
        <ButtonWrapper>
          <Button type='primary' onClick={() => form.submit()} size='large'>
            提交
          </Button>
          <Button onClick={() => form.resetFields()} size='large'>
            重置
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Form>
  );
};

export default TableFilter;
