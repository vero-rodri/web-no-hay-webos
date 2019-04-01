import React, { Component } from 'react';
import { Select, Box, Text  } from 'grommet';

class SelectInput extends Component {

  render() {
    const { 
      onChange,
      errors,
      options
    } = this.props;

    const hasErrors = errors && errors.length > 0;
    
    return (
      <Box margin={{top: "medium"}}>
      <Text margin={{bottom: "xsmall"}}>Tipo de reto:</Text>
      <Select
        onChange={onChange}
        options={options}
        //value={}
      />
      {hasErrors &&
        errors.map((error, index) => (
          <Text
            key={index} 
            size="small" 
            color="status-error" 
            margin={{top: "xsmall", left:"small"}}>
            {error}
          </Text>
        ))}
      {/* <Text>{getChallengeTypesText(this.state.challengeType)}</Text> */}
      </Box>
    )
  }
}

//   return (
//     <div className="mb-1">
//       <Select
//         onChange={onChange}
//         {...(placeholder ? { placeholder } : null)}
//         showSearch
//       >
//         {options.map(({ text, value }) => (
//           <Option key={value} value={value}>
//             {text}
//           </Option>
//         ))}
//       </Select>
//       {hasErrors &&
//         errors.map((error, index) => (
//           <p className="error" key={index}>
//             {error}
//           </p>
//         ))}
//     </div>
//   );
// }
// }


export default SelectInput;