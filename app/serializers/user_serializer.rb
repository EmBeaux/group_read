class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :featured_groups, :groups, :memberships


  def featured_groups
    groups = []
    Group.all.each do |group|
      if current_user.groups.any? {|your_group| group.id == your_group.id}
        puts "found"
      else
        groups << group
      end
    end
    return [groups[1], groups[2], groups[3], groups[4], groups[5], groups[6]]
  end

  def groups
    current_user.groups.order("created_at desc")
  end

  def memberships
    current_user.memberships
  end
end
