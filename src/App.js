import React, { useState, useRef, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './sidebar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import './index.css';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Veeam Backup & Replication Server' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showPropertyMenu, setShowPropertyMenu] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editedNodeLabel, setEditedNodeLabel] = useState('');
  const [editedNodeHostname, setEditedNodeHostname] = useState('');
  const [editedNodeIP, setEditedNodeIP] = useState('');

  const [inputErrors, setInputErrors] = useState({});

  const [credentialsMenuAnchorEl, setCredentialsMenuAnchorEl] = useState(null);
  const [selectedCredentialsOption, setSelectedCredentialsOption] = useState(null);

  const [credentialDialogOpen, setCredentialDialogOpen] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const data = event.dataTransfer.getData('application/reactflow');
      const { nodeType, nodeName } = JSON.parse(data);

      if (typeof nodeType === 'undefined' || !nodeType) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: {
          label: `${nodeName}`,
          hostname: '',
          ip: '',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const [propertyMenuPosition, setPropertyMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      setShowPropertyMenu(true);

      setEditedNodeLabel(node.data.label || '');
      setEditedNodeHostname(node.data.hostname || '');
      setEditedNodeIP(node.data.ip || '');
      setPropertyMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
    },
    []
  );

  const closePropertyMenu = useCallback(() => {
    setShowPropertyMenu(false);
    setInputErrors({});
    setPropertyMenuPosition({ top: 0, left: 0 });
  }, []);

  const updateNodeProperties = useCallback(() => {
    if (selectedNode) {
      const hostnameValidation = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})*(?<!-)$/;
      const ipValidation = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

      const { hostname, ip } = {
        hostname: editedNodeHostname,
        ip: editedNodeIP,
      };

      const errors = {};

      if (hostname && hostnameValidation.test(hostname)) {
        const labels = hostname.split('.');
        labels.forEach((label) => {
          if (
            label.length < 1 ||
            label.length > 63 ||
            !/^[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$/.test(label) ||
            label.startsWith('-') ||
            label.endsWith('-')
          ) {
            errors.hostname = 'Invalid label in hostname.';
          }
        });

        if (hostname.length > 253) {
          errors.hostname = 'Entire hostname, including delimiting dots, can be at most 253 characters long.';
        }

        const duplicateHostname = nodes.some((node) => node.data.hostname === hostname && node.id !== selectedNode.id);
        if (duplicateHostname) {
          errors.hostname = 'Duplicate hostname.';
        }
      } else {
        errors.hostname = 'Invalid hostname.';
      }

      if (ip && ipValidation.test(ip)) {
        const duplicateIP = nodes.some((node) => node.data.ip === ip && node.id !== selectedNode.id);
        if (duplicateIP) {
          errors.ip = 'Duplicate IP address.';
        }
      } else {
        errors.ip = 'Invalid IP address.';
      }

      setInputErrors(errors);

      if (Object.keys(errors).length === 0) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === selectedNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  label: editedNodeLabel,
                  hostname: editedNodeHostname,
                  ip: editedNodeIP,
                },
              };
            }
            return node;
          })
        );
        setShowPropertyMenu(false);
      }
    }
  }, [selectedNode, editedNodeLabel, editedNodeHostname, editedNodeIP, nodes]);

  const propertyMenu = (
    <Box
    style={{
      position: 'absolute',
      top: `${propertyMenuPosition.top}px`, 
      left: `${propertyMenuPosition.left}px`, 
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
      <TextField
        label="Label"
        type="text"
        value={editedNodeLabel}
        onChange={(e) => setEditedNodeLabel(e.target.value)}
        fullWidth
        margin="normal"
        disabled // Make label uneditable
      />
      <br />
      <TextField
        label="Hostname"
        type="text"
        value={editedNodeHostname}
        onChange={(e) => setEditedNodeHostname(e.target.value)}
        fullWidth
        margin="normal"
      />
      {inputErrors.hostname && <div style={{ color: 'red' }}>{inputErrors.hostname}</div>}
      <br />
      <TextField
        label="IP"
        type="text"
        value={editedNodeIP}
        onChange={(e) => setEditedNodeIP(e.target.value)}
        fullWidth
        margin="normal"
      />
      {inputErrors.ip && <div style={{ color: 'red' }}>{inputErrors.ip}</div>}
      <br />
      <Button variant="contained" onClick={updateNodeProperties} color="primary" style={{ marginBottom: '8px' }} >
        Update Properties
      </Button>
      <br />
      <Button variant="contained" onClick={closePropertyMenu} style={{ marginTop: '8px' }}>
        Close Menu
      </Button>
    </Box>
  );

  const closeCredentialsMenu = () => {
    setCredentialsMenuAnchorEl(null);
  };

  const openCredentialDialog = () => {
    setCredentialDialogOpen(true);
  };

  const closeCredentialDialog = () => {
    setCredentialDialogOpen(false);
  
    setEnteredUsername('');
    setEnteredPassword('');
  };

  const handleCredentialSave = () => {
    console.log('Entered Username:', enteredUsername);
    console.log('Entered Password:', enteredPassword);

  
    closeCredentialDialog();
  };

  const handleCredentialsMenuItemClick = (option) => {
    setSelectedCredentialsOption(option);
    openCredentialDialog();
  };


    const credentialsMenu = (
      <ClickAwayListener onClickAway={closeCredentialsMenu}>
        <div>
          <Button
            aria-controls="credentials-menu"
            aria-haspopup="true"
            onClick={(e) => setCredentialsMenuAnchorEl(e.currentTarget)}
        
          >
            Credentials
          </Button>
          <Menu
            id="credentials-menu"
            anchorEl={credentialsMenuAnchorEl}
            open={Boolean(credentialsMenuAnchorEl)}
            onClose={closeCredentialsMenu}
            style={{ marginTop: '45px', marginLeft: '-10px' }} // Adjust the positioning as needed
          >
            <MenuItem onClick={() => handleCredentialsMenuItemClick('linux')} disableRipple>
              <EditIcon /> Linux Credentials
            </MenuItem>
            <MenuItem onClick={() => handleCredentialsMenuItemClick('windows')} disableRipple>
              <EditIcon /> Windows Credentials
            </MenuItem>
          </Menu>
        </div>
      </ClickAwayListener>
    );

  const credentialDialog = (
    <Dialog open={credentialDialogOpen} onClose={closeCredentialDialog}>
      <DialogTitle>Enter Credentials</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          type="text"
          value={enteredUsername}
          onChange={(e) => setEnteredUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCredentialDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCredentialSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  const handleButtonClick = () => {
    // Placeholder logic for button click
    console.log('Button clicked! You can add your custom logic here.');
    // For example, you might want to trigger some action or update state.
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
          >
            <Controls />
            <Background color="#f0f0f0" gap={16} variant="lines" size={1} />
          </ReactFlow>
        </div>
        <div class="button-container">
          <Button>
          variant="contained"
            .{credentialsMenu}
            {credentialDialog}
          </Button>
        </div>
        <Box >
        {showPropertyMenu && propertyMenu}
        </Box>
        <Sidebar />
      </ReactFlowProvider>
      <div class="button-container">
      <Button
  variant="contained"
  onClick={handleButtonClick}
  style={{ marginTop: '8.5px' }}
>
  Deploy
</Button>
</div>
    </div>
    
  );
};

export default DnDFlow;