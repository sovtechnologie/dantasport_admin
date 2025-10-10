# Member Permission Treeview Feature

## Overview
This feature adds an expandable member list with permission management capabilities to the DantaSport Dashboard. Members can now have their permissions managed through an intuitive treeview interface that matches the design from the provided image.

## Features Implemented

### 1. PermissionTreeView Component
- **Location**: `src/components/PermissionTreeView.jsx`
- **Purpose**: Reusable component for managing member permissions
- **Features**:
  - Radio button groups for each permission category
  - Real-time change detection
  - Save and reset functionality
  - Loading states and error handling

### 2. Permission Categories
Based on the provided image, the following permission categories are supported:
- **Basic Info**: Manage basic member information
- **Event List**: Access to view event list and create new events
-**Create Event**: Access to view event list and create new events
- **Member**: Manage member-related permissions
- **Images**: Access to upload, edit, or delete images
- **Banner**: Manage banner-related permissions


### 3. Permission Types
Each category supports three permission levels:
- **Read**: View-only access
- **Write**: Full access including modifications
- **Hide**: No access (hidden from user)

### 4. Expandable Table Rows
- **Location**: Modified in `src/features/vendor/pages/ManagePage/Member.jsx`
- **Features**:
  - Click to expand/collapse permission management
  - Smooth animations and transitions
  - Lazy loading of permissions
  - Visual indicators for expanded state

### 5. State Management
- **Permission State**: Tracks individual member permissions
- **Loading States**: Per-member loading indicators
- **Change Detection**: Real-time tracking of unsaved changes
- **Error Handling**: Comprehensive error management

## File Structure

```
src/
├── components/
│   ├── PermissionTreeView.jsx
│   └── stylesheets/
│       └── PermissionTreeView.css
├── services/
│   └── vendor/
│       └── members/
│           └── useMemberPermissions.js
└── features/
    └── vendor/
        └── pages/
            └── ManagePage/
                ├── Member.jsx (modified)
                └── styelsheets/
                    └── Manage/
                        └── Member.css (modified)
```

## Usage

### Basic Implementation
```jsx
import PermissionTreeView from '../../components/PermissionTreeView';

<PermissionTreeView
  memberId={member.id}
  memberName={member.name}
  initialPermissions={memberPermissions[member.id] || {}}
  onUpdatePermissions={handleUpdatePermissions}
  loading={permissionLoading[member.id] || false}
/>
```

### API Integration
The component uses a service-based approach for API integration:

```javascript
import { useMemberPermissions } from '../../services/vendor/members/useMemberPermissions';

const { 
  loading, 
  fetchMemberPermissions, 
  updateMemberPermissions 
} = useMemberPermissions();
```

## Styling

### CSS Classes
- `.permission-treeview`: Main container
- `.permission-grid`: Grid layout for permission categories
- `.permission-category`: Individual category container
- `.permission-option`: Radio button option styling
- `.expanded-row-content`: Expandable row content
- `.expand-btn`: Expand/collapse button

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface elements

## API Integration

### Current Implementation
The current implementation uses mock data for demonstration purposes. To integrate with real APIs:

1. **Update `useMemberPermissions.js`**:
   ```javascript
   const fetchMemberPermissions = async (memberId) => {
     const response = await api.get(`/members/${memberId}/permissions`);
     return response.data;
   };
   
   const updateMemberPermissions = async (memberId, permissions) => {
     const response = await api.put(`/members/${memberId}/permissions`, permissions);
     return response.data;
   };
   ```

2. **Expected API Response Format**:
   ```json
   {
     "success": true,
     "data": {
       "banner": "read",
       "payout": "write",
       "page": "read",
       "zone": "hide",
       "category": "read",
       "paymentGateway": "write"
     }
   }
   ```

## Animation and Transitions

### Expand/Collapse Animation
- Smooth slide-down effect when expanding rows
- Fade-in animation for permission categories
- Hover effects for interactive elements

### CSS Animations
```css
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}
```

## Error Handling

### Loading States
- Per-member loading indicators
- Global loading states for API calls
- Skeleton loading for better UX

### Error Management
- Try-catch blocks for API calls
- User-friendly error messages
- Graceful fallbacks for failed operations

## Accessibility

### Keyboard Navigation
- Tab navigation through permission options
- Enter/Space key activation
- Focus indicators for screen readers

### ARIA Labels
- Proper labeling for screen readers
- Descriptive button text
- Clear state indicators

## Future Enhancements

### Potential Improvements
1. **Bulk Permission Management**: Select multiple members and update permissions
2. **Permission Templates**: Pre-defined permission sets for different roles
3. **Audit Trail**: Track permission changes over time
4. **Advanced Filtering**: Filter members by permission levels
5. **Export/Import**: Bulk permission management via CSV/Excel

### Performance Optimizations
1. **Virtual Scrolling**: For large member lists
2. **Caching**: Cache permission data to reduce API calls
3. **Debouncing**: Optimize permission update calls
4. **Lazy Loading**: Load permissions only when needed

## Testing

### Unit Tests
- Component rendering tests
- Permission state management tests
- API integration tests

### Integration Tests
- End-to-end permission management flow
- Error handling scenarios
- Responsive design testing

## Browser Support

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### CSS Features Used
- CSS Grid
- CSS Flexbox
- CSS Animations
- CSS Custom Properties

## Troubleshooting

### Common Issues
1. **Permissions not loading**: Check API endpoint configuration
2. **Styling issues**: Verify CSS file imports
3. **Animation glitches**: Check browser compatibility
4. **State not updating**: Verify callback dependencies

### Debug Mode
Enable debug logging by setting:
```javascript
const DEBUG_PERMISSIONS = true;
```

## Contributing

### Code Style
- Follow existing ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries
- Add comprehensive comments

### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request with description

## License
This feature is part of the DantaSport Dashboard project and follows the same licensing terms.
