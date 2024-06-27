import { useSignal } from '@vaadin/hilla-react-signals';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';
import type { Options, PointOptionsObject, SeriesOptionsType } from 'highcharts';
import {useEffect, useState} from "react";
import {ContactService} from "Frontend/generated/endpoints";
import ContactStatus from "Frontend/generated/org/vaadin/example/data/ContactStatus";



const hostStyle: React.CSSProperties = {
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    backgroundColor: 'var(--docs-surface-color-2)',
    padding: '0.5rem',
    paddingTop: '1.5rem',
    position: 'relative',
};

const chartStyle: React.CSSProperties = {
    padding: '0.5rem',
    boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
    zIndex: 1,
    top: '0.5rem',
    left: '1rem',
    fontSize: 'var(--docs-font-size-2xs)',
    fontWeight: 'var(--docs-font-weight-emphasis)',
    position: 'absolute',
};

const selectStyle = {
    font: 'inherit',
};


const pieOptions: Options = {
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: '60%',
        },
    },
};


export default function PieChart() {
    const theme = useSignal('');

    const [contactStatus, setContactStatus] = useState<ContactStatus  | undefined | null>(null);

    useEffect(() => {
        const status = ContactService.getContactStatus().then(setContactStatus);

    }, []);

    const pieValues: PointOptionsObject[] = [
        { name: 'Available', y: contactStatus?.numberOfAvailable || 0 },
        { name: 'Busy', y: contactStatus?.numberOfBusy || 0 },
        { name: 'Offline', y: contactStatus?.numberOfOffline || 0, sliced: true, selected: true },
        { name: 'Away', y: contactStatus?.numberOfAway || 0 },
    ];
    function changeTheme(e: React.ChangeEvent<HTMLSelectElement>) {
        theme.value = e.target.value;
    }

    return (
        <div style={hostStyle}>
            <label style={labelStyle}>
                Theme:
                <select style={selectStyle} onChange={changeTheme}>
                    <option value="">Default</option>
                    <option value="gradient">Gradient</option>
                    <option value="monotone">Monotone</option>
                    <option value="classic">Classic</option>
                </select>
            </label>
            {/* tag::snippet[] */}

            <Chart
                theme={theme.value}
                style={chartStyle}
                type="pie"
                tooltip
                additionalOptions={pieOptions}
            >
                <ChartSeries title="Brands" values={pieValues}/>
            </Chart>


            {/* end::snippet[] */}
        </div>
    );
}

