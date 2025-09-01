"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  fetchForms, 
  fetchFormByID, 
  createForm, 
  updateForm, 
  deleteForm, 
  toggleFormStatus 
} from "@/lib/api";
import { Form, CreateFormRequest } from "@/lib/types";
import { toast } from "react-toastify";
import { useEventQuery } from "@/redux/features/api/event/eventApi";
import { useSelector } from "react-redux";

export default function FormManagement() {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Event data
  const { data: eventsData, isLoading: eventsLoading } = useEventQuery({});
  const { event } = useSelector((state: any) => state.event);

  // Form state
  const [formData, setFormData] = useState<CreateFormRequest>({
    eventId: "",
    formTitle: "",
    description: "",
    includePayment: false,
  });

  // Event creation state
  const [newEventData, setNewEventData] = useState({
    name: "",
    description: "",
    category: "",
    venue: "",
    eventDate: "",
    eventTime: "",
    registrationFee: "",
    upiID: "",
  });

  // Load all forms on component mount
  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setIsLoading(true);
      const data = await fetchForms();
      setForms(data);
    } catch (error) {
      toast.error("Failed to load forms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateForm = async () => {
    if (!formData.eventId) {
      toast.error("Please select an event or create a new one");
      return;
    }

    try {
      setIsLoading(true);
      await createForm(formData);
      toast.success("Form created successfully!");
      setShowCreateForm(false);
      setFormData({ eventId: "", formTitle: "", description: "", includePayment: false });
      loadForms();
    } catch (error) {
      toast.error("Failed to create form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateForm = async () => {
    if (!selectedForm) return;
    
    try {
      setIsLoading(true);
      await updateForm(selectedForm.id, formData);
      toast.success("Form updated successfully!");
      setShowEditForm(false);
      setSelectedForm(null);
      loadForms();
    } catch (error) {
      toast.error("Failed to update form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteForm = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return;
    
    try {
      setIsLoading(true);
      await deleteForm(id);
      toast.success("Form deleted successfully!");
      loadForms();
    } catch (error) {
      toast.error("Failed to delete form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleFormStatus(id);
      toast.success("Form status toggled successfully!");
      loadForms();
    } catch (error) {
      toast.error("Failed to toggle form status");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditForm = (form: Form) => {
    setSelectedForm(form);
    setFormData({
      eventId: form.eventId,
      formTitle: form.formTitle,
      description: form.description,
      includePayment: form.includePayment,
    });
    setShowEditForm(true);
  };

  const handleCreateEvent = async () => {
    try {
      setIsLoading(true);
      // You can add event creation logic here or use your existing event API
      // For now, we'll just close the modal and show a success message
      toast.success("Event created successfully! You can now select it for the form.");
      setShowCreateEvent(false);
      setNewEventData({
        name: "",
        description: "",
        category: "",
        venue: "",
        eventDate: "",
        eventTime: "",
        registrationFee: "",
        upiID: "",
      });
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Form Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateEvent(true)}
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Create New Event
          </Button>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create New Form
          </Button>
        </div>
      </div>

      {/* Forms List */}
      <div className="grid gap-4">
        {forms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{form.formTitle}</CardTitle>
                  <p className="text-gray-600 mt-2">{form.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Event ID: {form.eventId}</span>
                    <span>Payment: {form.includePayment ? "Yes" : "No"}</span>
                    <span>Status: {form.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(form)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(form.id)}
                    disabled={isLoading}
                  >
                    {form.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteForm(form.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    value={newEventData.name}
                    onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <Label htmlFor="eventCategory">Event Category *</Label>
                  <Input
                    id="eventCategory"
                    value={newEventData.category}
                    onChange={(e) => setNewEventData({ ...newEventData, category: e.target.value })}
                    placeholder="e.g., Workshop, Hackathon"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="eventDescription">Description *</Label>
                <Textarea
                  id="eventDescription"
                  value={newEventData.description}
                  onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventVenue">Venue *</Label>
                  <Input
                    id="eventVenue"
                    value={newEventData.venue}
                    onChange={(e) => setNewEventData({ ...newEventData, venue: e.target.value })}
                    placeholder="Enter venue"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEventData.eventDate}
                    onChange={(e) => setNewEventData({ ...newEventData, eventDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventTime">Event Time *</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={newEventData.eventTime}
                    onChange={(e) => setNewEventData({ ...newEventData, eventTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationFee">Registration Fee *</Label>
                  <Input
                    id="registrationFee"
                    value={newEventData.registrationFee}
                    onChange={(e) => setNewEventData({ ...newEventData, registrationFee: e.target.value })}
                    placeholder="e.g., Free, ₹299"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="upiID">UPI ID</Label>
                <Input
                  id="upiID"
                  value={newEventData.upiID}
                  onChange={(e) => setNewEventData({ ...newEventData, upiID: e.target.value })}
                  placeholder="Enter UPI ID for payments"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateEvent}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Creating..." : "Create Event"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateEvent(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eventId">Select Event *</Label>
                <select
                  id="eventId"
                  value={formData.eventId}
                  onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select an Event</option>
                  {event && event.map((eventItem: any) => (
                    <option key={eventItem._id} value={eventItem._id}>
                      {eventItem.name} - {eventItem.category}
                    </option>
                  ))}
                </select>
                {!formData.eventId && (
                  <p className="text-sm text-red-600 mt-1">
                    Please select an event or create a new one first
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="formTitle">Form Title *</Label>
                <Input
                  id="formTitle"
                  value={formData.formTitle}
                  onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })}
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter form description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="includePayment"
                  checked={formData.includePayment}
                  onCheckedChange={(checked) => setFormData({ ...formData, includePayment: checked })}
                />
                <Label htmlFor="includePayment">Include Payment</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateForm}
                  disabled={isLoading || !formData.eventId}
                  className="flex-1"
                >
                  {isLoading ? "Creating..." : "Create Form"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="editFormTitle">Form Title</Label>
                <Input
                  id="editFormTitle"
                  value={formData.formTitle}
                  onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })}
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter form description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="editIncludePayment"
                  checked={formData.includePayment}
                  onCheckedChange={(checked) => setFormData({ ...formData, includePayment: checked })}
                />
                <Label htmlFor="editIncludePayment">Include Payment</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateForm}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Updating..." : "Update Form"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
