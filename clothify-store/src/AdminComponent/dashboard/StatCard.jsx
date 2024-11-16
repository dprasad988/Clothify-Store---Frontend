import React from 'react';
import { Card } from 'antd';

function StatCard({ title, count, icon }) {
  return (
    <Card>
      <Card.Meta
        avatar={icon}
        title={title}
        description={
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
            {count}
          </div>
        }
      />
    </Card>
  );
}

export default StatCard;
