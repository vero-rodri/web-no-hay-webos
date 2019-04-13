import React from 'react';
import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph = (data) => {
  console.log("VENGAAA AL AGRAFICA CON , ", data);
  return(
    <ResponsivePie
        data={data}
        margin={{
            "top": 1,
            "right": 100,
            "bottom": 60,
            "left": 100
        }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={5}
        colors="nivo"
        colorBy="id"
        borderColor="inherit:darker(0)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={8}
        radialLabelsTextColor="#000000"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={10}
        radialLabelsLinkHorizontalLength={15}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#000000"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "participando"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "conseguidos"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "rechazados"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "pendientes"
                },
                "id": "dots"
            }
        ]}
        legends={[
            {
                "anchor": "bottom",
                "direction": "row",
                "translateY": 60,
                "translateX": 0,
                "itemWidth": 85,
                "itemHeight": 0,
                "itemTextColor": "#999",
                "itemDirection": "bottom-to-top",
                "symbolSize": 20,
                "symbolShape": "circle",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemTextColor": "#000"
                        }
                    }
                ]
            }
        ]}
    />

  )
      }

export default Graph;