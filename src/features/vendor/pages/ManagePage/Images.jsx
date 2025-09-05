import "../../styelsheets/Manage/Images.css";
import VenueImage from "../../../../assets/Vendor/VenueImage.png";
import DeleteIcon from "../../../../assets/Vendor/deleteIcon.png";
import EditIcon from "../../../../assets/Vendor/EditIcon.png";

// VenueImagesPage.jsx
import { Button, Select, message, Skeleton, Card, Tooltip, Badge, Modal, Image, Spin } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, CameraOutlined, DragOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchGalleryImage } from "../../../../hooks/vendor/galleryImage/useFetchGalleryImage";
import { useDeleteGalleryImage } from "../../../../hooks/vendor/galleryImage/useDeleteGalleryImage";
import { useUpdateGalleryImage } from "../../../../hooks/vendor/galleryImage/useUpdateGalleryImage";
import AddVenueImage from "./AddVenueImage";
import EditVenueImage from "./EditVenueImage";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Enterprise-level Error Boundary for Drag and Drop
class DragDropErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error for monitoring
    console.error('Drag and Drop Error Boundary caught an error:', error, errorInfo);
    
    // Optional: Send to error reporting service
    // errorReportingService.captureException(error, {
    //   tags: { component: 'DragDropErrorBoundary' },
    //   extra: { errorInfo }
    // });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="drag-drop-error-fallback">
          <div className="error-content">
            <h3>Image Reordering Temporarily Unavailable</h3>
            <p>We're experiencing a technical issue with image reordering. Please try refreshing the page or contact support if the problem persists.</p>
            <Button 
              type="primary" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '16px' }}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const { Option } = Select;
const dummyImages = Array(6).fill(VenueImage);

// Professional Shimmer Loading Component
const ImageCardSkeleton = () => (
  <Card className="professional-skeleton-card">
    <div className="skeleton-image-container">
      <Skeleton.Image 
        active 
        className="skeleton-image"
        style={{ width: '100%', height: '160px' }} 
      />
      <div className="skeleton-overlay">
        <Skeleton.Button active size="small" shape="circle" />
      </div>
    </div>
    <div className="skeleton-content">
      <div className="skeleton-meta">
        <Skeleton.Avatar active size="small" />
        <Skeleton.Input active size="small" style={{ width: '60px' }} />
      </div>
      <div className="skeleton-actions">
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
        <Skeleton.Button active size="small" style={{ width: '24px', height: '24px' }} />
      </div>
    </div>
  </Card>
);

// Enterprise-level Sortable Image Card Component
const SortableImageCard = ({ 
  image, 
  index, 
  deletingImageId, 
  onDelete, 
  onEdit, 
  onView,
  isReordering = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id: image.id,
    disabled: deletingImageId === image.id || isReordering
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Disable transition during drag for better performance
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  // Enterprise-level accessibility attributes
  const accessibilityProps = {
    role: 'button',
    tabIndex: 0,
    'aria-label': `Image ${image.display_order || index + 1}, drag to reorder`,
    'aria-describedby': `image-${image.id}-description`,
    'data-testid': `sortable-image-${image.id}`,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes}
      {...accessibilityProps}
      className={`sortable-image-wrapper ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
    >
      <Card
        className={`compact-image-card enterprise-card ${deletingImageId === image.id ? 'deleting' : ''} ${isDragging ? 'dragging' : ''} ${isReordering ? 'reordering' : ''}`}
        hoverable={deletingImageId !== image.id && !isDragging && !isReordering}
        cover={
          <div 
            className="compact-image-container" 
            onClick={() => deletingImageId !== image.id && !isDragging && onView(image)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (deletingImageId !== image.id && !isDragging) {
                  onView(image);
                }
              }
            }}
          >
            <img 
              src={image.image_url} 
              alt={`Venue Image ${image.display_order || index + 1}`} 
              className="compact-image"
              loading="lazy"
              onError={(e) => {
                console.warn(`Failed to load image ${image.id}:`, e);
                e.target.style.display = 'none';
              }}
            />
            <div className="compact-overlay">
              <Tooltip title="Click to view full size">
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<EyeOutlined />} 
                  size="small"
                  className="compact-overlay-btn"
                  disabled={deletingImageId === image.id || isDragging}
                  aria-label="View full size image"
                />
              </Tooltip>
            </div>
            {deletingImageId === image.id && (
              <div className="delete-loading-overlay">
                <Spin size="large" />
                <span className="delete-loading-text">Deleting...</span>
              </div>
            )}
            {isDragging && (
              <div className="drag-indicator">
                <div className="drag-indicator-content">
                  <DragOutlined />
                  <span>Moving...</span>
                </div>
              </div>
            )}
          </div>
        }
        size="small"
        actions={[
          <Tooltip title="Drag to reorder" key="drag">
            <Button 
              type="text" 
              icon={<DragOutlined />} 
              className="compact-action-btn drag-btn"
              size="small"
              disabled={deletingImageId === image.id || isReordering}
              {...listeners}
              aria-label="Drag to reorder image"
            />
          </Tooltip>,
          <Tooltip title="Edit Image" key="edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(image)}
              className="compact-action-btn edit-btn"
              size="small"
              disabled={isDragging || isReordering}
              aria-label="Edit image"
            />
          </Tooltip>,
          <Tooltip title={deletingImageId === image.id ? "Deleting..." : "Delete Image"} key="delete">
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />} 
              onClick={() => onDelete(image)}
              className="compact-action-btn delete-btn"
              size="small"
              loading={deletingImageId === image.id}
              disabled={deletingImageId === image.id || isDragging || isReordering}
              aria-label="Delete image"
            />
          </Tooltip>
        ]}
      >
        <div className="compact-meta">
          <Badge 
            count={image.display_order || index + 1} 
            style={{ backgroundColor: '#1163C7', fontSize: '10px' }}
            size="small"
          />
          <span className="compact-position">#{image.display_order || index + 1}</span>
          {isDragging && (
            <span className="drag-status">Moving...</span>
          )}
        </div>
        <div id={`image-${image.id}-description`} className="sr-only">
          Image {image.display_order || index + 1} of venue gallery. Use drag handle to reorder.
        </div>
      </Card>
    </div>
  );
};

const VenueImagesPage = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageViewModal, setShowImageViewModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const [isVenueChanging, setIsVenueChanging] = useState(false);
  const navigate = useNavigate();
  const { data: venueList, loading: venueLoading, error: venueError } = useFetchVendorVenueList();
  const { data: galleryList, loading: galleryLoading, error: galleryError } = useFetchGalleryImage({ venueId: selectedVenueId || 1, type: 1 });
  const deleteImageMutation = useDeleteGalleryImage();
  const updateImageMutation = useUpdateGalleryImage();

  // Enterprise-level drag and drop sensors with advanced configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
        delay: 100, // 100ms delay to prevent accidental drags
        tolerance: 5, // 5px tolerance for touch devices
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Enterprise drag start handler
  const handleDragStart = (event) => {
    const { active } = event;
    console.log("🎯 Drag started:", {
      imageId: active.id,
      timestamp: new Date().toISOString(),
      operation: 'drag_start'
    });
    
    // Optional: Analytics tracking
    // analyticsService.track('image_drag_start', {
    //   imageId: active.id,
    //   venueId: selectedVenueId,
    //   totalImages: sortedImages.length
    // });
  };

  // Enterprise drag over handler for visual feedback
  const handleDragOver = (event) => {
    const { active, over } = event;
    
    // Provide visual feedback for valid drop zones
    if (over && active.id !== over.id) {
      // Optional: Add visual indicators for drop zones
      console.log("🎯 Drag over valid drop zone:", {
        from: active.id,
        to: over.id,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Enterprise drag cancel handler
  const handleDragCancel = (event) => {
    console.log("🚫 Drag cancelled:", {
      reason: event.active ? 'user_cancelled' : 'system_cancelled',
      timestamp: new Date().toISOString()
    });
  };

  useEffect(() => {
    if (venueList?.resutl?.length && !selectedVenueId) {
      setSelectedVenueId(venueList.resutl[0].venue_id);
    }
  }, [venueList, selectedVenueId]);

  // Handle venue change with loading state
  const handleVenueChange = (venueId) => {
    setIsVenueChanging(true);
    setSelectedVenueId(venueId);
    // Reset loading state after a short delay to allow data to load
    setTimeout(() => {
      setIsVenueChanging(false);
    }, 500);
  };

  // Handle errors
  useEffect(() => {
    if (venueError) {
      message.error("Failed to load venue list");
    }
    if (galleryError) {
      message.error("Failed to load gallery images");
    }
  }, [venueError, galleryError]);

  // Enterprise-level memoized sorted images for performance
  const sortedImages = useMemo(() => {
    if (!galleryList?.result) return [];
    return [...galleryList.result].sort((a, b) => a.display_order - b.display_order);
  }, [galleryList?.result]);

  // Memoized selected venue for performance
  const selectedVenue = useMemo(() => {
    return venueList?.resutl?.find(venue => venue.venue_id === selectedVenueId);
  }, [venueList?.resutl, selectedVenueId]);

  // Memoized drag items for performance
  const dragItems = useMemo(() => {
    return sortedImages.map(img => img.id);
  }, [sortedImages]);

  // Enterprise-level drag end handler with comprehensive error handling and optimization
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    // Validate drag operation
    if (!active.id || !over?.id || active.id === over.id) {
      return;
    }

    const oldIndex = sortedImages.findIndex((item) => item.id === active.id);
    const newIndex = sortedImages.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.warn("Invalid drag operation: image not found in list");
      message.warning("Unable to reorder: image not found");
      return;
    }

    // Calculate new order
    const newSortedImages = arrayMove(sortedImages, oldIndex, newIndex);
    
    // Optimize: Only update images that actually changed position
    const imagesToUpdate = newSortedImages
      .map((image, index) => {
        const newDisplayOrder = index + 1;
        return image.display_order !== newDisplayOrder 
          ? { ...image, newDisplayOrder, oldDisplayOrder: image.display_order }
          : null;
      })
      .filter(Boolean);

    if (imagesToUpdate.length === 0) {
      console.log("No position changes detected, skipping update");
      return;
    }

    setIsReordering(true);
    const hide = message.loading({
      content: `Reordering ${imagesToUpdate.length} image${imagesToUpdate.length > 1 ? 's' : ''}...`,
      duration: 0,
      key: 'reorder-loading'
    });
    
    try {
      console.log("🔄 Starting enterprise reorder operation:", {
        totalImages: sortedImages.length,
        imagesToUpdate: imagesToUpdate.length,
        venueId: selectedVenueId,
        operation: 'drag_drop_reorder'
      });

      // Batch update with retry logic
      const updatePromises = imagesToUpdate.map(async (imageData, retryCount = 0) => {
        try {
          const formData = new FormData();
          formData.append("venueId", String(selectedVenueId));
          formData.append("type", "1");
          formData.append("displayOrder", String(imageData.newDisplayOrder));
          formData.append("imageGalleryId", String(imageData.id));
          
          console.log(`📤 Updating image ${imageData.id}: ${imageData.oldDisplayOrder} → ${imageData.newDisplayOrder}`);
          
          const result = await updateImageMutation.mutateAsync(formData);
          
          if (result?.status !== 200) {
            throw new Error(`Unexpected response status: ${result?.status}`);
          }
          
          return { success: true, imageId: imageData.id, newOrder: imageData.newDisplayOrder };
        } catch (error) {
          console.error(`❌ Failed to update image ${imageData.id} (attempt ${retryCount + 1}):`, error);
          
          // Retry logic for enterprise resilience
          if (retryCount < 2) {
            console.log(`🔄 Retrying update for image ${imageData.id}...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
            return updatePromises[updatePromises.indexOf(updatePromises.find(p => p.imageId === imageData.id))](imageData, retryCount + 1);
          }
          
          throw {
            imageId: imageData.id,
            error: error.message || 'Unknown error',
            retryCount: retryCount + 1
          };
        }
      });

      const results = await Promise.allSettled(updatePromises);
      
      // Analyze results
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      console.log("📊 Reorder operation results:", {
        total: results.length,
        successful,
        failed,
        successRate: `${Math.round((successful / results.length) * 100)}%`
      });

      if (failed === 0) {
        message.success({
          content: `Successfully reordered ${successful} image${successful > 1 ? 's' : ''}`,
          duration: 3,
          key: 'reorder-success'
        });
      } else if (successful > 0) {
        message.warning({
          content: `Partially completed: ${successful} successful, ${failed} failed. Some images may not be in the correct order.`,
          duration: 5,
          key: 'reorder-partial'
        });
        
        // Log failed operations for debugging
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`Failed image update:`, result.reason);
          }
        });
      } else {
        throw new Error("All reorder operations failed");
      }

    } catch (error) {
      console.error("❌ Enterprise reorder operation failed:", error);
      
      // Detailed error reporting
      const errorMessage = error.message || "Unknown error occurred";
      message.error({
        content: `Reorder failed: ${errorMessage}. Please try again or contact support if the issue persists.`,
        duration: 8,
        key: 'reorder-error'
      });
      
      // Optional: Send error to monitoring service
      // errorReportingService.captureException(error, {
      //   tags: { operation: 'drag_drop_reorder', venueId: selectedVenueId },
      //   extra: { imagesToUpdate: imagesToUpdate.length, totalImages: sortedImages.length }
      // });
      
    } finally {
      hide();
      setIsReordering(false);
    }
  };

  // Enterprise-level memoized handlers for performance
  const handleAddImage = useCallback(() => {
    if (sortedImages?.length >= 6) {
      message.warning("Maximum of 6 images allowed per venue. Please delete an existing image to add a new one.");
      return;
    }
    setShowAddModal(true);
  }, [sortedImages?.length]);

  const handleDeleteImage = async (image) => {
    try {
      setDeletingImageId(image.id);
      console.log("🗑️ Deleting image:", image);
      const payload = { imageId: image.id, venueId: selectedVenueId };
      console.log("📋 Delete payload:", payload);
      
      const result = await deleteImageMutation.mutateAsync(payload);
      console.log("✅ Delete result:", result);
      
      // Check if response status is 200
      if (result?.status === 200) {
        message.success("Image deleted successfully!");
        console.log("✅ Delete successful - Status 200 confirmed");

        // Reorder remaining images if needed
        const deletedOrder = image.display_order;
        const imagesToReorder = sortedImages
          .filter((img) => img.id !== image.id && img.display_order > deletedOrder)
          .sort((a, b) => a.display_order - b.display_order);

        if (imagesToReorder.length > 0) {
          const hide = message.loading("Reordering images...", 0);
          try {
            await Promise.all(
              imagesToReorder.map(async (img) => {
                const formData = new FormData();
                formData.append("venueId", String(selectedVenueId));
                formData.append("type", "1");
                formData.append("displayOrder", String(img.display_order - 1));
                formData.append("imageGalleryId", String(img.id));
                return updateImageMutation.mutateAsync(formData);
              })
            );
            message.success("Images reordered");
          } catch (reorderError) {
            console.error("❌ Reorder error:", reorderError);
            message.error("Failed to reorder images");
          } finally {
            hide();
          }
        }
      } else {
        message.warning("Image deleted but unexpected response status");
        console.log("⚠️ Unexpected status:", result?.status);
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      message.error("Failed to delete image");
    } finally {
      setDeletingImageId(null);
    }
  };

  const handleEditImage = useCallback((image) => {
    console.log("🖼️ Editing image:", image);
    setSelectedImage(image);
    setShowEditModal(true);
  }, []);

  const handleViewImage = useCallback((image) => {
    console.log("👁️ Viewing image:", image);
    setViewingImage(image);
    setShowImageViewModal(true);
  }, []);

  // selectedVenue is already memoized above for performance

  // Show loading state for entire page when venues are loading
  if (venueLoading) {
    return (
      <div className="venue-card">
        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">Loading venues...</div>
        </div>
      </div>
    );
  }

  // Show loading state when no venue is selected, when gallery is loading, or when venue is changing
  // Also show loading if we have a venue but no gallery data yet (prevents showing static data)
  if (!selectedVenueId || galleryLoading || isVenueChanging || (selectedVenueId && !galleryList)) {
    return (
      <div className="venue-card">
        <div className="venue-toolbar">
          <Select
            placeholder="Select Venue"
            className="venue-select"
            loading={venueLoading}
            onChange={handleVenueChange}
            value={selectedVenueId || undefined}
            disabled={venueLoading || !venueList?.resutl?.length}
          >
            {venueList?.resutl?.map((venue) => (
              <Option key={venue.venue_id} value={venue.venue_id}>
                {venue.venue_name}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            className="add-btn"
            disabled={true}
          >
            + Add Venue Image
          </Button>
        </div>

        <h3 className="venue-title">
          {selectedVenue?.venue_name || "Select a venue to view images"}
        </h3>

        <div className="page-loading-container">
          <Spin size="large" />
          <div className="page-loading-text">
            {!selectedVenueId 
              ? "Please select a venue to view images" 
              : isVenueChanging 
                ? "Switching venue..." 
                : selectedVenueId && !galleryList
                  ? "Fetching venue images..."
                  : "Loading images..."
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-card">
      <div className="venue-toolbar">
        <Select
          placeholder="Select Venue"
          className="venue-select"
          loading={venueLoading}
          onChange={handleVenueChange}
          value={selectedVenueId || undefined}
          disabled={venueLoading || !venueList?.resutl?.length}
        >
          {venueList?.resutl?.map((venue) => (
            <Option key={venue.venue_id} value={venue.venue_id}>
              {venue.venue_name}
            </Option>
          ))}
        </Select>
        <Button 
          type="primary" 
          className="add-btn"
          disabled={!selectedVenueId || (sortedImages?.length >= 6) || galleryLoading || isReordering}
          onClick={handleAddImage}
        >
          + Add Venue Image
          {sortedImages?.length >= 6 && (
            <span className="max-limit-indicator"> (Max 6)</span>
          )}
          {isReordering && (
            <span className="reordering-indicator"> (Reordering...)</span>
          )}
        </Button>
      </div>

      <h3 className="venue-title">
        {selectedVenue?.venue_name || "Select a venue to view images"}
      </h3>


      <DragDropErrorBoundary>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
        <div className="image-grid">
          {sortedImages?.length > 0 ? (
            // Show actual images with drag and drop
            <SortableContext
              items={dragItems}
              strategy={verticalListSortingStrategy}
            >
              {sortedImages.map((img, index) => (
                <SortableImageCard
                  key={img.id}
                  image={img}
                  index={index}
                  deletingImageId={deletingImageId}
                  onDelete={handleDeleteImage}
                  onEdit={handleEditImage}
                  onView={handleViewImage}
                  isReordering={isReordering}
                />
              ))}
            </SortableContext>
          ) : (
            // Show empty state message
            <div className="empty-state-container">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <CameraOutlined />
                </div>
                <h3 className="empty-state-title">No Images Found</h3>
                <p className="empty-state-description">
                  This venue doesn't have any images yet. Click the "Add Venue Image" button to upload your first image.
                </p>
                <div className="empty-state-info">
                  <div className="info-item">
                    <span className="info-label">Maximum Images:</span>
                    <span className="info-value">6 images per venue</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Supported Formats:</span>
                    <span className="info-value">JPG, PNG, GIF</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Max File Size:</span>
                    <span className="info-value">10MB per image</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </DndContext>
      </DragDropErrorBoundary>

      <AddVenueImage
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
        selectedVenueId={selectedVenueId}
      />

      <EditVenueImage
        isVisible={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedImage(null);
        }}
        selectedImage={selectedImage}
        selectedVenueId={selectedVenueId}
      />

      {/* Image View Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOutlined style={{ color: '#1163C7' }} />
            View Image - Position {viewingImage?.display_order}
          </div>
        }
        open={showImageViewModal}
        onCancel={() => {
          setShowImageViewModal(false);
          setViewingImage(null);
        }}
        footer={null}
        width="auto"
        centered
        style={{ maxWidth: '90vw' }}
      >
        {viewingImage && (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={viewingImage.image_url}
              alt={`Venue Image ${viewingImage.display_order}`}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
              preview={false}
            />
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Position:</strong> #{viewingImage.display_order}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Venue:</strong> {selectedVenue?.venue_name}
              </div>
              <div>
                <strong>Type:</strong> Gallery Image
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VenueImagesPage;
