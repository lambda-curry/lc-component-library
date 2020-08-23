import React from 'react';

const Red = props => (
  <span className="lc-text-danger lc-font-bold" {...props} />
);

const StoryPropTypesTable = ({ propDefinitions }) => {
  const props = propDefinitions.map(
    ({ property, propType, required, description, defaultValue }) => {
      return (
        <tr key={property}>
          <td className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            {property}
            {required ? <Red>*</Red> : null}
          </td>
          <td className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            {propType.name}
          </td>
          <td className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            {defaultValue}
          </td>
          <td className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            {description}
          </td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr>
          <th className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            name
          </th>
          <th className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            type
          </th>
          <th className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            default
          </th>
          <th className="lc-border-gray-light lc-border-solid lc-border-2 lc-py-8 lc-px-16">
            description
          </th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};

export default StoryPropTypesTable;
