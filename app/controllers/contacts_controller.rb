class ContactsController < ApplicationController
    def new
      @contact = Contact.new  #The form attributes of name,email and comments saved to variable @contact
    end
    
    def create
      @contact = Contact.new(contact_params)
      if @contact.save
        flash[:success] = "Message Sent"
        redirect_to new_contact_path
      else
        flash[:danger] = @contact.errors.full_messages.join(" , ")
        redirect_to new_contact_path
      end  
    end  
    
    private #Security feature to whitelist the form attributes
      def contact_params
        params.require(:contact).permit(:name, :email, :comments) #White listing of form attributes 
      end  
    
end