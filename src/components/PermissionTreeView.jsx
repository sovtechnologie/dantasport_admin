import React, { useState, useEffect } from "react";
import { Card, Radio, Button, message, Spin } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import "./stylesheets/PermissionTreeView.css";

const PermissionTreeView = ({
  memberId,
  memberName,
  initialPermissions = {},
  onUpdatePermissions,
  loading = false,
}) => {
  const [permissions, setPermissions] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Permission categories based on the API response
  // Updated permission categories
  const permissionCategories = [
    { key: "basicInfo", label: "Basic Info" },
    { key: "eventList", label: "Event List" },
    { key: "createevent", label: "Create Event" },
    { key: "member", label: "Member" },
    { key: "images", label: "Images" },
    { key: "banner", label: "Banner" },
  ];

  // Status mapping: Hide=0, Read=1, Write=2
  const permissionTypes = [
    { key: "hide", label: "Hide", value: 0 },
    { key: "read", label: "Read", value: 1 },
    { key: "write", label: "Write", value: 2 },
  ];

  // Check if permissions are available
  const hasPermissions =
    initialPermissions.permissions && initialPermissions.permissions.length > 0;
  const memberInfo = initialPermissions.memberInfo || {};

  // Initialize permissions from API response
  useEffect(() => {
    if (hasPermissions) {
      const apiPermissions = {};
      permissionCategories.forEach((category) => {
        // Find permission in API response
        const apiPermission = initialPermissions.permissions.find(
          (p) => p.name.toLowerCase() === category.label.toLowerCase()
        );

        if (apiPermission) {
          // Map API status to permission type
          const statusMap = { 0: "hide", 1: "read", 2: "write" };
          apiPermissions[category.key] =
            statusMap[apiPermission.status] || "hide";
        } else {
          // Default to hide if permission not found
          apiPermissions[category.key] = "hide";
        }
      });
      setPermissions(apiPermissions);
    } else {
      // No permissions available - set all to hide by default
      const defaultPermissions = {};
      permissionCategories.forEach((category) => {
        defaultPermissions[category.key] = "hide";
      });
      setPermissions(defaultPermissions);
    }
  }, [initialPermissions, memberId, hasPermissions]);

  // Check for changes
  useEffect(() => {
    const hasChanges = Object.keys(permissions).some(
      (key) => permissions[key] !== (initialPermissions[key] || "read")
    );
    setHasChanges(hasChanges);
  }, [permissions, initialPermissions]);

  const handlePermissionChange = (category, permissionType) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: permissionType,
    }));
  };

  const handleUpdateRole = async () => {
    try {
      setSaving(true);

      // Convert permissions to API format with status values
      const apiPermissions = permissionCategories.map((category) => {
        const permissionType = permissions[category.key] || "hide";
        const statusValue =
          permissionTypes.find((p) => p.key === permissionType)?.value || 0;

        return {
          name: category.label,
          status: statusValue,
        };
      });

      await onUpdatePermissions(memberId, apiPermissions);
      setHasChanges(false);
      message.success("Member permissions updated successfully");
    } catch (error) {
      message.error("Failed to update permissions");
      console.error("Permission update error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const defaultPermissions = {};
    permissionCategories.forEach((category) => {
      defaultPermissions[category.key] =
        initialPermissions[category.key] || "read";
    });
    setPermissions(defaultPermissions);
    setHasChanges(false);
  };

  if (loading) {
    return (
      <div className="permission-treeview-loading">
        <Spin size="large" />
        <div className="loading-text">
          {hasPermissions
            ? "Refreshing permissions..."
            : "Loading permissions..."}
        </div>
      </div>
    );
  }

  return (
    <div className="permission-treeview">
      <div className="permission-header">
        <h4 className="permission-title">
          {hasPermissions
            ? `Manage Permissions for ${memberName}`
            : `Add Role for ${memberName}`}
        </h4>
        <div className="permission-actions">
          {hasPermissions && (
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              disabled={!hasChanges || saving}
              size="small"
            >
              Reset
            </Button>
          )}
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleUpdateRole}
            disabled={!hasChanges || saving}
            loading={saving}
            size="small"
          >
            {hasPermissions ? "UPDATE ROLE" : "ADD ROLE"}
          </Button>
        </div>
      </div>

      {!hasPermissions && (
        <div className="no-permissions-message">
          <p>
            No permissions have been assigned to this member yet. Set the
            permissions below and click "ADD ROLE" to assign them.
          </p>
        </div>
      )}

      <div className="permission-grid">
        {permissionCategories.map((category, index) => (
          <div key={category.key} className="permission-category">
            <div className="category-title">{category.label}</div>
            <div className="permission-options">
              {permissionTypes.map((permission) => (
                <div
                  key={permission.key}
                  className={`permission-option ${
                    permissions[category.key] === permission.key
                      ? "selected"
                      : ""
                  }`}
                >
                  <Radio
                    checked={permissions[category.key] === permission.key}
                    onChange={() =>
                      handlePermissionChange(category.key, permission.key)
                    }
                    disabled={saving}
                  />
                  <span className="permission-label">{permission.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="permission-changes-indicator">
          <span className="changes-text">You have unsaved changes</span>
        </div>
      )}
    </div>
  );
};

export default PermissionTreeView;
