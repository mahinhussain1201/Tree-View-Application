import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TreeView = ({ setSelectedItem }) => {
  const [godowns, setGodowns] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios.get('/api/godowns')
      .then((res) => setGodowns(res.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleExpand = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <li key={node.id}>
        <div onClick={() => toggleExpand(node.id)} style={{ cursor: 'pointer' }}>
          {node.name} {node.subLocations ? (expanded[node.id] ? '[-]' : '[+]') : ''}
        </div>
        {node.subLocations && expanded[node.id] && (
          <ul>
            {renderTree(node.subLocations)}
          </ul>
        )}
        {node.items && expanded[node.id] && (
          <ul>
            {node.items.map((item) => (
              <li key={item.item_id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      <h2>Godown Tree..</h2>
      <ul>
        {renderTree(godowns)}
      </ul>
    </div>
  );
};

export default TreeView;
