import React from 'react';
import Popover from 'antd/lib/popover';
import { useState } from 'react';
import { BulbOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import { Card } from 'antd';

import { Canvas } from 'cvat-canvas-wrapper';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    canvasInstance: Canvas;
    isDrawing: boolean;
    disabled?: boolean;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-rectangle');
function TestData(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const [pointString, setPointString] = useState("");

    const dynamcPopoverPros = isDrawing ?
        {
            overlayStyle: {
                display: 'none',
            },
        } :
        {};

    const dynamicIconProps = isDrawing ?
        {
            className: 'cvat-draw-rectangle-control cvat-active-canvas-control',
            onClick: (): void => {
                canvasInstance.draw({ enabled: false });
            },
        } :
        {
            className: 'cvat-draw-rectangle-control',
        };

    const getPoints = () => {
        setPointString(JSON.stringify(canvasInstance.model.data.objects.map((object) => ({"points": object.points, "label": object.label.name})), null, 2));
    }


    const getContent = (): JSX.Element => {
        return (
            <Card title="Points on the Canvas" style={{ width: 300 }}>
                <div><pre>{pointString}</pre></div>
                <Button
                type="primary"
                onClick={getPoints}>Get Points</Button>
            </Card>
        )
    };

    return disabled ? (
        <BulbOutlined className='cvat-draw-rectangle-control cvat-disabled-canvas-control' style={{
            fontSize: '40px'
        }}/>
    ) : (
        <CustomPopover
            {...dynamcPopoverPros}
            overlayClassName='cvat-draw-shape-popover'
            placement='right'
            content={getContent}
        >
            <BulbOutlined {...dynamicIconProps} style={{
            fontSize: '40px'
        }}/>
        </CustomPopover>
    );
}

export default React.memo(TestData);