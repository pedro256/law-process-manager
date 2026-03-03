import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip 
} from 'recharts';

interface PieChartProps {
  data: { status: string; count: number }[];
  title: string;
}

const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#BFDBFE', '#EFF6FF'];

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="count"
              animationDuration={1500}
              label={({ status, count }) => `${status}: ${count}`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px' 
              }}
              formatter={(value, name, props) => [`${value} processos`, props.payload.status]}
            />
            <Legend formatter={(value, entry) => entry.payload.status} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;