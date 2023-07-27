import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const Collapses = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIconPosition="end"
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{
        background: token.colorBgContainer,
      }}
      size="large"
    >
      <Panel header="Do you take reservations?" key="1" style={panelStyle}>
        <p>Yes</p>
      </Panel>
      <Panel header="Are you open on government holidays" key="2" style={panelStyle}>
        <p>Yes</p>
      </Panel>
      <Panel header="Is there parking nearby?" key="3" style={panelStyle}>
        <p>Yes</p>
      </Panel>
      <Panel header="What payment options do I have?" key="4" style={panelStyle}>
        <p> Credit card, 
    Debit card, 
    Internet banking (Internet enabled online bank account), 
    UPI (Applicable for some of the boat house)</p>
      </Panel>
    </Collapse>
  );
};
export default Collapses;