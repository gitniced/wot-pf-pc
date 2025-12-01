import React from "react";
import { Modal, Input, Button, Form, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface IPLimitModalProps {
  open: boolean;
  onOk: (ips: string[]) => void;
  onCancel: () => void;
  initialIPs?: string[];
}

const IPLimitModal: React.FC<IPLimitModalProps> = ({
  open,
  onOk,
  onCancel,
  initialIPs = [],
}) => {
  const [form] = Form.useForm();

  // 打开时初始化
  React.useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ips: ["192.168.142.162", "192.168.142.175", "192.168.142.166",],
      });
    }
  }, [open, initialIPs, form]);

  // 校验至少有一个且不能为空
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values.ips.filter((ip: string) => ip && ip.trim() !== ""));
    } catch (e) {
      // 校验不通过
    }
  };

  return (
    <Modal
      title="IP限制"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <div style={{ fontWeight: 600, marginBottom: 16 }}>白名单</div>
      <Form form={form} layout="vertical">
        <Form.List
          name="ips"
        //   rules={[
        //     {
        //       validator: async (_, ips) => {
        //         if (!ips || ips.length < 1 || ips.every((ip: string) => !ip || ip.trim() === "")) {
        //           return Promise.reject(new Error("至少填写一个IP"));
        //         }
        //       },
        //     },
        //   ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, idx) => (
                <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      { required: true, whitespace: true, message: "请输入IP" },
                      {
                        pattern: /^(?:\*|(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))(\.(?:\*|(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))){3}$/,
                        message: "请输入合法的IP地址或*通配符",
                      },
                    ]}
                  >
                    <Input placeholder="请输入" style={{ width: 400 }} />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      type="text"
                      danger
                    />
                  )}
                </Space>
              ))}
              <Form.ErrorList errors={errors} />
              <Button type="dashed" onClick={() => add()} style={{ width: 400 }}>
                + 添加
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default IPLimitModal;
